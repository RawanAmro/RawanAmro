module.exports = {
  grant_type: "password",
  clientId: "strapi_test",

  username: "test_user",
  password: "root",

  clientSecret: "V4OQ1Lkhpm5HFmiH6UX1WgMd9VvFB5Lt",

  authEndpoint:
    "http://keycloak:8080/realms/test_realm",

  authServerUrl: 'http://0.0.0.0:8080/',

  tokenEndpoint:
    "http://keycloak:8080/realms/test_realm/protocol/openid-connect/token",

  userinfoEndpoint:
    "http://0.0.0.0:8080/realms/test_realm/protocol/openid-connect/userinfo",

  logoutEndpoint:
    "http://0.0.0.0:8080/realms/test_realm/protocol/openid-connect/logout",

  redirectUri: "http://localhost:1337/keycloak/callback",

  redirectToUrlAfterLogin: "http://localhost:1337/api/static-pages",

  permittedOverwriteRedirectUrls: [
    "http://localhost:1337",
    "http://localhost:1338",
  ],

  redirectToUrlAfterLogout: "http://localhost:1337/",

  debug: true,
};
