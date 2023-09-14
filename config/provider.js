   // case 'keycloak': {
   //    const keycloak = purest({
   //      provider: 'keycloak',
   //      config: {
   //        keycloak: {
   //          'https://mykeacloakprovider.com/auth/realms/Innowo': {
   //            __domain: {
   //              auth: {
   //                auth: { bearer: '[0]' },
   //              },
   //            },
   //            '{endpoint}': {
   //              __path: {
   //                alias: '__default',
   //              },
   //            },
   //          },
   //        },
   //      },
   //    });
   //    keycloak
   //      .query()
   //      .get('protocol/openid-connect/token')
   //      .auth(access_token)
   //      .request((err, res, body) => {
   //        if (err) {
   //          callback(err);
   //        } else {
   //          callback(null, {
   //            username: body.username,
   //            email: body.email,
   //          });
   //        }
   //      });
   //    break;
   //  }
