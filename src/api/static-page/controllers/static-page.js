console.log("KKKKKK controllers");
const {getKeycloakAccessToken} = require('../middlewares/keycloak-provider');

module.exports = {
  find: async (ctx) => {
    const accessToken = ctx.request.header.authorization.split(' ')[1];
    try {
      const userInfo = await getKeycloakAccessToken(accessToken);
      const result = await strapi.services['static-page'].find(ctx.query);
      ctx.send({
        user: userInfo,
        data: result
      });
    } catch (error) {
      ctx.throw(400, 'Invalid Keycloak Token');
    }
  },

  findOne: async (ctx) => {
    const {id} = ctx.params;
    const accessToken = ctx.request.header.authorization.split(' ')[1];
    try {
      const userInfo = await getKeycloakAccessToken(accessToken);
      const result = await strapi.services['static-page'].findOne({id});
      ctx.send({
        user: userInfo,
        data: result
      });
    } catch (error) {
      ctx.throw(400, 'Invalid Keycloak Token or Data not found');
    }
  },
  create: async (ctx) => {
    const accessToken = ctx.request.header.authorization.split(' ')[1];
    try {
      const userInfo = await getKeycloakAccessToken(accessToken);
      const data = ctx.request.body;
      const result = await strapi.services['static-page'].create(data);
      ctx.send({
        user: userInfo,
        data: result
      });
    } catch (error) {
      ctx.throw(400, 'Invalid Keycloak Token or Error creating data');
    }
  },
  update: async (ctx) => {
    const accessToken = ctx.request.header.authorization.split(' ')[1];
    try {
      const userInfo = await getKeycloakAccessToken(accessToken);
      const data = ctx.request.body;
      const result = await strapi.services['static-page'].update(data);
      ctx.send({
        user: userInfo,
        data: result
      });
    } catch (error) {
      ctx.throw(400, 'Invalid Keycloak Token or Error creating data');
    }
  },
  delete: async (ctx) => {
    const accessToken = ctx.request.header.authorization.split(' ')[1];
    try {
      const userInfo = await getKeycloakAccessToken(accessToken);
      console.log(accessToken)
      const data = ctx.request.body;
      const result = await strapi.services['static-page'].delete(data);
      ctx.send({
        user: userInfo,
        data: result
      });
    } catch (error) {
      ctx.throw(400, 'Invalid Keycloak Token or Error creating data');
    }
  }
};
