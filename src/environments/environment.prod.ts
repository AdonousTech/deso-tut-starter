export const environment = {
    production: true,
    api: {
      UIPassthroughUri: ''
    },
    authData: {
      AppWebDomain: '',
      TokenScopesArray: ['email','openid','phone','profile'],
      RedirectUriSignIn: '',
      RedirectUriSignOut: '',
      IdentityProvider: '',
      IdentityPoolId: '',
      UserPoolId: '',
      AdvancedSecurityDataCollectionFlag: false,
      Region: '',
      UserPoolWebClientId: ''
    },
    system: {
      dbTableName: ''
    },
    bitclout: {
      node: 'node.bitcloutapps.ninja',
      identityService: 'https://identity.bitclout.com'
    }
  };
