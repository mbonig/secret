import {
  GetRandomPasswordCommand,
  GetSecretValueCommand,
  PutSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { mockClient } from 'aws-sdk-client-mock';
import 'aws-sdk-client-mock-jest';

function generateEvent(param: {
  ResourceProperties: any;
  OldResourceProperties?: any;
  RequestType: 'Create' | 'Update' | 'Delete';
}): any {
  return {
    RequestType: param.RequestType,
    ServiceToken: 'arn:aws:lambda:us-east-1:071128183726:function:TestStack-MySecretCustomResourceProviderframeworko-1ZDQpW1kgurO',
    ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/arn%3Aaws%3Acloudformation%3Aus-east-1%3A071128183726%3Astack/TestStack/284cfd60-d28d-11ee-9bbf-0a86394bf2ad%7CMySecretGenerateSecretStringCR9DD0E80D%7C7c765427-457e-49e1-ab27-3364ddf6952c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240223T205118Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=AKIA6L7Q4OWTX2SQBBEW%2F20240223%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=beda84c34aae648e9af93de5e530407805f91235a49c527ac38c390f2e942ea4',
    StackId: 'arn:aws:cloudformation:us-east-1:071128183726:stack/TestStack/284cfd60-d28d-11ee-9bbf-0a86394bf2ad',
    RequestId: '7c765427-457e-49e1-ab27-3364ddf6952c',
    LogicalResourceId: 'MySecretGenerateSecretStringCR9DD0E80D',
    ResourceType: 'Custom::GenerateSecretString',
    PhysicalResourceId: '',
    ResourceProperties: {
      ServiceToken: 'arn:aws:lambda:us-east-1:071128183726:function:TestStack-MySecretCustomResourceProviderframeworko-1ZDQpW1kgurO',
      Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
      GenerateSecretString: {
        secretStringTemplate: '{"username":"my-username","password":"some-password"}',
      },
      ...param.ResourceProperties,
    },
    OldResourceProperties: {
      ServiceToken: 'arn:aws:lambda:us-east-1:071128183726:function:TestStack-MySecretCustomResourceProviderframeworko-1ZDQpW1kgurO',
      ...param.OldResourceProperties,
    },
  };
}

describe('EventHandler', () => {
  const mockSecret = mockClient(SecretsManagerClient);
  let SECRET_ID = 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U';

  beforeEach(() => {
    mockSecret.reset();
  });

  describe('create event', () => {
    test('Sets the secret as-is when no generateField is provided', async () => {
      // arrange
      // set up mock write secret
      mockSecret.on(PutSecretValueCommand, {}).resolves({});

      // act
      const { handler } = await import('../src/EventHandler/EventHandler.lambda');
      await handler(generateEvent({
        RequestType: 'Create',
        ResourceProperties: {
          Secret: SECRET_ID,
          GenerateSecretString: {
            secretStringTemplate: '{"username":"my-username","password":"some-password"}',
          },
        },
      }));

      // assert
      expect(mockSecret).toHaveReceivedCommandWith(PutSecretValueCommand, {
        SecretId: SECRET_ID,
        SecretString: JSON.stringify({ username: 'my-username', password: 'some-password' }),
      });
    });

    test('Generates a random value for the secret when a generateKey is provided', async () => {
      // arrange
      // set up mock write secret
      mockSecret.on(PutSecretValueCommand, {}).resolves({});
      mockSecret.on(GetRandomPasswordCommand, {}).resolves({
        RandomPassword: 'some-random-password',
      });

      // act
      const { handler } = await import('../src/EventHandler/EventHandler.lambda');
      await handler(generateEvent({
        RequestType: 'Create',
        ResourceProperties: {
          Secret: SECRET_ID,
          GenerateSecretString: {
            secretStringTemplate: '{"username":"my-username","password":"some-password"}',
            generateStringKey: 'password',
          },
        },
      }));

      // assert
      expect(mockSecret).toHaveReceivedCommandWith(PutSecretValueCommand, {
        SecretId: SECRET_ID,
        SecretString: JSON.stringify({
          username: 'my-username',
          password: 'some-random-password',
        }),
      });
    });

    test('Passes random value generation options through', async () => {
      // arrange
      // set up mock write secret
      mockSecret.on(PutSecretValueCommand, {}).resolves({});
      mockSecret.on(GetRandomPasswordCommand, {
        ExcludeCharacters: 'abc',
        ExcludeLowercase: true,
        ExcludeNumbers: true,
        ExcludePunctuation: true,
        ExcludeUppercase: true,
        IncludeSpace: true,
        PasswordLength: 40,
        RequireEachIncludedType: true,
      }).resolves({
        RandomPassword: 'some-random-password',
      });

      // act
      const { handler } = await import('../src/EventHandler/EventHandler.lambda');
      await handler(generateEvent({
        RequestType: 'Create',
        ResourceProperties: {
          Secret: SECRET_ID,
          GenerateSecretString: {
            secretStringTemplate: '{"username":"my-username","password":"some-password"}',
            generateStringKey: 'password',
            excludeCharacters: 'abc',
            excludeLowercase: true,
            excludeNumbers: true,
            excludePunctuation: true,
            excludeUppercase: true,
            includeSpace: true,
            passwordLength: 40,
            requireEachIncludedType: true,
          },
        },
      }));

      // assert
      expect(mockSecret).toHaveReceivedCommandWith(PutSecretValueCommand, {
        SecretId: SECRET_ID,
        SecretString: JSON.stringify({
          username: 'my-username',
          password: 'some-random-password',
        }),
      });
    });
  });

  describe('Update event', () => {
    test('Adds new values to the secret', async () => {
      // arrange
      // set up mock write secret
      mockSecret.on(GetSecretValueCommand, {
        SecretId: SECRET_ID,
      }).resolves({
        SecretString: JSON.stringify({
          username: 'some-updated-value',
          password: 'these-were-manually-set',
        }),
      });
      mockSecret.on(PutSecretValueCommand, {}).resolves({});

      // act
      const { handler } = await import('../src/EventHandler/EventHandler.lambda');
      await handler(generateEvent({
        RequestType: 'Update',
        OldResourceProperties: {
          Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
          GenerateSecretString: {
            secretStringTemplate: JSON.stringify({
              username: 'my-username',
              password: 'some-password',
            }),
          },
        },
        ResourceProperties: {
          Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
          GenerateSecretString: {
            secretStringTemplate: JSON.stringify({
              'username': 'my-username',
              'password': 'some-password',
              'some-new-key': 'some-new-value',
            }),
          },
        },
      }));

      // assert
      expect(mockSecret).toHaveReceivedCommandWith(PutSecretValueCommand, {
        SecretId: SECRET_ID,
        SecretString: JSON.stringify({
          'username': 'some-updated-value',
          'password': 'these-were-manually-set',
          'some-new-key': 'some-new-value',
        }),
      });
    });

    test('Changes existing values to the secret', async () => {
      // arrange
      // set up mock write secret
      mockSecret.on(GetSecretValueCommand, {
        SecretId: SECRET_ID,
      }).resolves({
        SecretString: JSON.stringify({
          username: 'some-updated-value',
          password: 'these-were-manually-set',
        }),
      });
      mockSecret.on(PutSecretValueCommand, {}).resolves({});

      // act
      const { handler } = await import('../src/EventHandler/EventHandler.lambda');
      await handler(generateEvent({
        RequestType: 'Update',
        OldResourceProperties: {
          Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
          GenerateSecretString: {
            secretStringTemplate: JSON.stringify({
              username: 'my-username',
              password: 'some-password',
            }),
          },
        },
        ResourceProperties: {
          Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
          GenerateSecretString: {
            secretStringTemplate: JSON.stringify({
              username: 'my-username',
              password: 'some-new-password',
            }),
          },
        },
      }));

      // assert
      expect(mockSecret).toHaveReceivedCommandWith(PutSecretValueCommand, {
        SecretId: SECRET_ID,
        SecretString: JSON.stringify({
          username: 'some-updated-value',
          password: 'some-new-password',
        }),
      });
    });

    test('deleting a value on the secret', async () => {
      // arrange
      // set up mock write secret
      mockSecret.on(GetSecretValueCommand, {
        SecretId: SECRET_ID,
      }).resolves({
        SecretString: JSON.stringify({
          username: 'some-updated-value',
          password: 'these-were-manually-set',
        }),
      });
      mockSecret.on(PutSecretValueCommand, {}).resolves({});

      // act
      const { handler } = await import('../src/EventHandler/EventHandler.lambda');
      await handler(generateEvent({
        RequestType: 'Update',
        OldResourceProperties: {
          Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
          GenerateSecretString: {
            secretStringTemplate: JSON.stringify({
              username: 'my-username',
              password: 'some-password',
            }),
          },
        },
        ResourceProperties: {
          Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
          GenerateSecretString: {
            secretStringTemplate: JSON.stringify({
              username: 'my-username',
            }),
          },
        },
      }));

      // assert
      expect(mockSecret).toHaveReceivedCommandWith(PutSecretValueCommand, {
        SecretId: SECRET_ID,
        SecretString: JSON.stringify({
          username: 'some-updated-value',
        }),
      });
    });

    describe('regenerates key value if', () => {

      function setupMocks() {
        // arrange
        // set up mock write secret
        mockSecret.on(GetSecretValueCommand, {
          SecretId: SECRET_ID,
        }).resolves({
          SecretString: JSON.stringify({
            username: 'some-updated-value',
            password: 'these-were-manually-set',
          }),
        });
        mockSecret.on(PutSecretValueCommand, {}).resolves({});
        mockSecret.on(GetRandomPasswordCommand, {}).resolves({
          RandomPassword: 'some-random-value',
        });
      }

      async function act(previousValues: any, newValues: any) {
        const { handler } = await import('../src/EventHandler/EventHandler.lambda');
        await handler(generateEvent({
          RequestType: 'Update',
          OldResourceProperties: {
            Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
            GenerateSecretString: {
              secretStringTemplate: JSON.stringify({
                username: 'my-username',
                password: 'some-password',
              }),
              generateStringKey: 'username',
              ...previousValues,

            },
          },
          ResourceProperties: {
            Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
            GenerateSecretString: {
              secretStringTemplate: JSON.stringify({
                username: 'my-username',
                password: 'some-password',
              }),
              generateStringKey: 'username',
              ...newValues,
            },
          },
        }));
      }

      function expectNewRandomValue() {
        expect(mockSecret).toHaveReceivedCommandWith(PutSecretValueCommand, {
          SecretId: SECRET_ID,
          SecretString: JSON.stringify({
            username: 'some-random-value',
            password: 'these-were-manually-set',
          }),
        });
      }

      test('GenerateStringKey changes', async () => {
        setupMocks();

        // act
        await act({
          generateStringKey: 'password',
        }, {
          generateStringKey: 'username',
        });

        // assert
        expectNewRandomValue();
      });

      test('ExcludeCharacters property change', async () => {
        // arrange
        setupMocks();

        // act
        await act({
          excludeCharacters: 'abc',
        }, {
          excludeCharacters: 'def',
        });
        expectNewRandomValue();
      });

      test('ExcludeLowercase property change', async () => {
        // arrange
        setupMocks();

        // act
        await act({
          excludeLowercase: true,
        }, {
          excludeLowercase: false,
        });
        expectNewRandomValue();
      });

      test('ExcludeNumbers property change', async () => {
        // arrange
        setupMocks();

        // act
        await act({
          excludeNumbers: true,
        }, {
          excludeNumbers: false,
        });
        expectNewRandomValue();
      });

      test('ExcludePunctuation property change', async () => {
        // arrange
        setupMocks();

        // act
        await act({
          excludePunctuation: true,
        }, {
          excludePunctuation: false,
        });
        expectNewRandomValue();
      });

      test('ExcludeUppercase property change', async () => {
        // arrange
        setupMocks();

        // act
        await act({
          excludeUppercase: true,
        }, {
          excludeUppercase: false,
        });
        expectNewRandomValue();
      });

      test('IncludeSpace property change', async () => {
        // arrange
        setupMocks();

        // act
        await act({
          includeSpace: true,
        }, {
          includeSpace: false,
        });
        expectNewRandomValue();
      });

      test('PasswordLength property change', async () => {
        // arrange
        setupMocks();

        // act
        await act({
          passwordLength: 30,
        }, {
          passwordLength: 31,
        });
        expectNewRandomValue();
      });
      test('RequireEachIncludedType property change', async () => {
        // arrange
        setupMocks();

        // act
        await act({
          requireEachIncludedType: true,
        }, {
          requireEachIncludedType: false,
        });
        expectNewRandomValue();
      });
    });

  });

  describe('delete event', () => {
    test('Does nothing, nothing at all...', async () => {
      const { handler } = await import('../src/EventHandler/EventHandler.lambda');
      await handler(generateEvent({
        RequestType: 'Delete',
        ResourceProperties: {
          Secret: 'arn:aws:secretsmanager:us-east-1:071128183726:secret:MySecret8FE80B51-cS1evYuDw5EE-sBg10U',
          GenerateSecretString: {
            secretStringTemplate: '{"username":"my-username","password":"some-password"}',
          },
        },
      }));
      expect(mockSecret).not.toHaveReceivedCommand(PutSecretValueCommand);
    });
  });
});
