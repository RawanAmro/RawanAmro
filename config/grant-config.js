module.exports = ({ env }) => ({
  host: 'keycloak',
  port: env.int('PORT', 8080),
    enabled: false,
    icon: 'key',
    key: '',
    secret: '',
    callback: `'http://strapi:1337/keycloak/callback'`,
    scope: ['email'],
  app: {
    keys: env.array('APP_KEYS'),
  },
});
