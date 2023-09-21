'use strict';

/**
 * static-page router
 */
// console.log('*************************');
// const axios = require('axios');
//
// const keycloakTokenUrl = 'http://localhost:8080/auth/realms/test_realm/protocol/openid-connect/token'; // Replace with your Keycloak URL
// const clientId = 'strapi_test'; // Replace with your client ID
// const clientSecret = 'c549b80f-66e7-4112-8ef7-dc7a506289d5'; // Replace with your client secret (if applicable)
// const username = 'test_user'; // Replace with the Keycloak username
// const password = 'root'; // Replace with the user's password
//
// async function getKeycloakAccessToken() {
//   try {
//     const response = await axios.post(
//       keycloakTokenUrl,
//       new URLSearchParams({
//         grant_type: 'password',
//         client_id: clientId,
//         client_secret: clientSecret,
//         username: username,
//         password: password,
//       }),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );
//
//     if (response.status === 200 && response.data.access_token) {
//        console.log('Access Token:', accessToken);
//       return response.data.access_token;
//     } else {
//       throw new Error('Failed to obtain Keycloak access token');
//     }
//   } catch (error) {
//     throw error;
//   }
// }
//
// module.exports = {
//   getKeycloakAccessToken,
// };
const Purest = require('purest');

const keycloak = new Purest({
  provider: 'keycloak',
  config: {
    'keycloak': {
      'http://keycloak:8080/auth/realms/test_realm': {
        '__domain': {
          'auth': {
            'auth': {
              'bearer': '[0]'
            }
          }
        },
        '{endpoint}': {
          '__path': {
            'alias': '__default'
          }
        }
      }
    }
  }
});

keycloak.query().get('protocol/openid-connect/userinfo').auth('eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2SmZSd3pwS2o2dUxGMkhOM0U4V0kyVktkUzZGYjFvT0c2TEFkc2ZYTXQwIn0.eyJleHAiOjE2OTUyMzAzNzAsImlhdCI6MTY5NTIzMDA3MCwianRpIjoiNzU4YmExMDEtNGFhZS00NmIzLWFjMGQtYzI3OThkZmRlNzI4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL3Rlc3RfcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYjkzOThjYTktMzY5Yy00MmIwLWI2OTMtOTI2NGMyNDU1NjI4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3RyYXBpX3Rlc3QiLCJzZXNzaW9uX3N0YXRlIjoiMDdlYzk4MjYtZTFkOS00MWU1LThiMmEtZDNiNzg0ZGY3OWYxIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUkFXQU4gYW1ybyIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3RfdXNlciIsImdpdmVuX25hbWUiOiJSQVdBTiIsImZhbWlseV9uYW1lIjoiYW1ybyIsImVtYWlsIjoicmF3YW5Ac2l0ZWNoLm1lIn0.X3PIBTocrJharL1Uv9bBR8dlGK4xH2xvYicjMVY-7upgg_rKjPOaVFhqk6U1ayzEv_6bqUSudwklOhnsjbIcnJ-T7A6mtnkThi6MYP6BxNovvmZl37uAq-zLA6VyLpqADUq3qfuuw4qfZR1xVxMMX1srOuje4uUXkLCS8uAeWnLCBaFMIbpDZM1Con0GAXLYomycEbr0dv1kb3j3Cdt65Oy-ZTu5do9izSiqjk1SP_S7K9AucI2UkmAn79wvDkv56LZvfTpEVOoM8yubhpK52CXRezqE6hQE2-xWN-g5JYw2WVFeSkhGUunFA-XXbeGxmAW88tgH5xW5YQAV1WRZTQ').request((err, res, body) => {
  if (err) {
    callback(err);
  } else {
    callback(null, {
      username: body.preferred_username,
      email: body.email
    });
  }
});
