module.exports = {
  // client ID
  clientId: "strapi_test",

  jwtPublicKey: "FZOWVtbIEJmg_wns-5ZVmrRVOmaxgqbnr2BPCBsSYes",

  jwtAlgorithm: "HS256",

  clientSecret: "814ab3e3-f7cd-4761-9234-d284329134af",

  authEndpoint:
    "http://localhost:8080/auth/realms/test_realm",

  authServerUrl: 'http://localhost:8080/auth/',

  tokenEndpoint:
    "http://localhost:8080/auth/realms/test_realm/protocol/openid-connect/token",

  userinfoEndpoint:
    "http://localhost:8080/auth/realms/test_realm/protocol/openid-connect/userinfo",

  logoutEndpoint:
    "http://keycloak:8080/auth/realms/test_realm/protocol/openid-connect/logout",

  redirectUri: "http://localhost:1337/keycloak/callback",

  redirectToUrlAfterLogin: "http://localhost:1337/api/static-pages",

  permittedOverwriteRedirectUrls: [
    "http://localhost:1337",
    "http://localhost:1338",
  ],

  redirectToUrlAfterLogout: "http://localhost:1337/",

  debug: true,
};
