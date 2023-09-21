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
      'http://keycloak/auth': {
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

async function getUserInfo() {
  try {
    const response = await keycloak
      .get('protocol/openid-connect/userinfo')
      .auth('eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkRFIySVVuYmZsdmFRQkVvbHhyWmlJZDR0bnBPZlJ2WDBEMHUwa2x1UnIwIn0.eyJleHAiOjE2OTUyODkzMTgsImlhdCI6MTY5NTI4OTAxOCwianRpIjoiMjBmZTVlNjYtY2I2Yi00OWExLTg5YzUtMjk2NjgwMjc1NzZkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL3Rlc3RfcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOTE1Y2I3MzUtMDllMi00MmU3LWJkMWYtNGE3N2RjNzE4YWRjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3RyYXBpX3Rlc3QiLCJzZXNzaW9uX3N0YXRlIjoiZDY0NjYxNTQtNGY1NS00OWNkLWJlNDItMWRlZDA5OTBjZjEzIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0X3VzZXIifQ.BKjAdv04DkLQtszlEJm3SKs-I_qKRvmW9khsOA2ma7-VuHFZQgG_0oQuNbMFvi7G8vkv6IzozsT9Sr1Ub-JrDJiCIw1RrjhPcmdbzMqf7qyP20bLW7NyI5ga8rQw6coo5cHGgvROgQ-9sq5nJyE0CtnkHUKRtnoGTgO-E4vBagEtmKT-3kJMwqGnqvPCWtDFZF12WDVphPQnmjdkOl7gBbX6FU_zS4jtqsjpaEu_ZUsSgCI5aC3t_di0WruGG5XGmpympCo5AyJIjqXIqpuZH9vk_XoY8KX5_lHY5lDFHvSM3kRCU8g-QaRPpJ3hiD8chkYcasQPI9-SqzLPCRYlvw')
      .request();

    if (response.status === 200) {
      return {
        username: response.body.preferred_username,
        email: response.body.email,
      };
    } else {
      throw new Error('Failed to obtain user info');
    }
  } catch (error) {
    throw error;
  }
}

// Usage example:
// getUserInfo()
//   .then((userInfo) => {
//     console.log('User Info:', userInfo);
//   })
//   .catch((error) => {
//     console.error('Error:', error.message);
//   });
