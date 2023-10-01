console.log("KKKKKK routes")
const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::static-page.static-page", {
  config: {
    find: {
      middlewares: ["plugin::keycloak.keycloak"],
    }
  }
});
