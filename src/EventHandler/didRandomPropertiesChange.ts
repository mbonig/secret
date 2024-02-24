export function didRandomPropertiesChange(oldGenerateSecretString: any, generateSecretString: any) {
  return oldGenerateSecretString.excludeCharacters !== generateSecretString.excludeCharacters ||
    oldGenerateSecretString.excludeLowercase !== generateSecretString.excludeLowercase ||
    oldGenerateSecretString.excludeNumbers !== generateSecretString.excludeNumbers ||
    oldGenerateSecretString.excludePunctuation !== generateSecretString.excludePunctuation ||
    oldGenerateSecretString.excludeUppercase !== generateSecretString.excludeUppercase ||
    oldGenerateSecretString.includeSpace !== generateSecretString.includeSpace ||
    oldGenerateSecretString.passwordLength !== generateSecretString.passwordLength ||
    oldGenerateSecretString.requireEachIncludedType !== generateSecretString.requireEachIncludedType;

}
