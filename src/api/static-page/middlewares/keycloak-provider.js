
const Keycloak = require('keycloak-connect');
const keycloakConfig = require('./keycloak.json'); // Import your Keycloak configuration
const keycloakService = require('./keycloak'); // Adjust the path as needed

const keycloak = new Keycloak({ store: true }, keycloakConfig);

module.exports = (strapi) => {
  return {
    async initialize() {
      try {
        const accessToken = await keycloakService.getKeycloakAccessToken(); // Fetch the access token when initializing the middleware
        await strapi.plugins['users-permissions'].services.jwt.getToken(strapi, accessToken);
        console.log(accessToken)
        return keycloak.middleware();
      } catch (error) {
        // Handle the error appropriately (e.g., log or throw)
        throw error;
      }
    },
  };
};
