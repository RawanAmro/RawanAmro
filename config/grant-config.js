module.exports = ({ env }) => ({
  host: 'keycloak',
  port: env.int('PORT', 8080),
    enabled: true,
    icon: 'key',
    key: '',
    secret: '',
    callback: `'http://localhost:1337/keycloak/callback'`,
    scope: ['email'],
  app: {
    keys: env.array('APP_KEYS'),
  },
});
