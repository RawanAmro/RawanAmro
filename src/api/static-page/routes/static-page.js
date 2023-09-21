console.log('**********skjfla***************');
const keycloakService = require('../middlewares/keycloak'); // Adjust the path as needed
const { createCoreRouter } = require('@strapi/strapi').factories;
const keycloakMiddleware = require('../middlewares/keycloak-provider'); // Import your middleware function

module.exports = createCoreRouter('api::static-page.static-page', {
  // ...other route configurations
  config: {
    find: {
      middlewares: [keycloakMiddleware], // Use the middleware function
    },
  },
});
