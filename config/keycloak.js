module.exports = {
  // client ID configured in Keycloak
  clientId: "strapi_test",

  // if the client access type is set to "confidential" in keycloak, add the client secret here. otherwise, don't set this value.
  clientSecret: "3dc6fe11-f767-4024-ae3e-fc3787c1bdde",
  // auth endpoint, right value comes from Keycloak
  authEndpoint:
    "http://localhost:8080/realms/test_realm/protocol/openid-connect/auth",

  // token endpoint, right value comes from Keycloak
  tokenEndpoint:
    "http://localhost:8080/realms/test_realm/protocol/openid-connect/token",

  // user info endpoint, right value comes from Keycloak
  userinfoEndpoint:
    "http://localhost:8080/realms/test_realm/protocol/openid-connect/userinfo",

  // logout endpoint, right value comes from Keycloak
  logoutEndpoint:
    "http://localhost:8080/realms/test_realm/protocol/openid-connect/logout",

  // redirect URI after Keycloak login, should be the full URL of the Strapi instance and always point to the `keycloak/callback` endpoint
  redirectUri: "http://localhost:1337/keycloak/callback",

  // default URL to redirect to when login process is finished. In normal cases, this would redirect you back to the application using Strapi data
  redirectToUrlAfterLogin: "http://localhost:1337/api/static-pages",

  // setting these allows the client to pass a `redirectTo` query parameter to the `login` endpoint. If the `redirectTo`
  // parameter is permitted by this array, after login, Strapi will redirect the user to it. Leave empty to disable
  // the functionality.
  permittedOverwriteRedirectUrls: [
    "http://localhost:1337",
    "http://localhost:1338",
  ],

  // URL to redirect to after logout
  redirectToUrlAfterLogout: "http://localhost:1337/",

  // enable debug messages in server log
  debug: true,
};
