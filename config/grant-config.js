module.exports = ({ env }) => ({
  host: 'keycloak',
  port: env.int('PORT', 8080),
    enabled: false,
    icon: 'key',
    key: '',
    secret: '',
    callback: `'http://localhost:1337/admin/auth/local/callback'`,
    scope: ['email'],
  app: {
    keys: env.array('APP_KEYS'),
  },
});
