module.exports = [
  // Internal, built-in middlewares prefixed by `strapi::`
  'strapi::errors',
  'strapi::security',
   'strapi::logger',

  // Add your keycloakMiddleware with configuration:
  {
    name: 'api::static-page.keycloak-middleware',
    config: {
      // Your middleware's specific config parameters.
      keycloakServerURL: "http://keycloak:8080/auth",
      realm: 'test_realm',
      bypassInDevelopment: true
    },
  },

  'strapi::cors',

  // remaining internal & built-in middlewares
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
