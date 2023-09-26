console.log("Starting Keycloak Middleware Initialization");

const fs = require('fs'); // Include the File System module
const Purest = require('purest');
const keycloakConfig = require('./keycloak.json'); // Import the configuration

const keycloak = new Purest({
  provider: 'keycloak',
  config: {
    'keycloak': {
      [keycloakConfig['auth-server-url'] + '/realms/' + keycloakConfig.realm]: {
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

async function getKeycloakAccessToken(access_token) {
  try {
    const response = await keycloak
      .get('protocol/openid-connect/userinfo')
      .auth(`Bearer ${access_token}`)
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
    fs.appendFileSync('logs.json', JSON.stringify({
      timestamp: new Date().toISOString(),
      message: "Error occurred in getKeycloakAccessToken",
      error: error.message
    }) + ',\n'); // Write error log to logs.json file

    throw error;
  }
}

const strapi =() => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        const accessToken = ctx.request.header.authorization.split(' ')[1];
        try {
          await getKeycloakAccessToken(accessToken);
          await next();
        } catch (error) {
          console.log(error)
          ctx.throw(400, 'Invalid Keyclhhhoak Token');
        }
      });
    },
  };
};
module.exports  = {getKeycloakAccessToken, strapi};
console.log("Completed Keycloak Middleware Initialization");
if (process.env.NODE_ENV === "development") {
    getKeycloakAccessToken('eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlb2t5UzUxZGljT3J4Z3diS1dEbjJfT3p4bTJ0RFZjNmhCNlNrV2ZqNkNnIn0.eyJleHAiOjE2OTU2NTIxMjUsImlhdCI6MTY5NTY1MTgyNSwianRpIjoiMmViNTcwODgtNTY4Yy00YjI4LTg5NmEtNTZkODM1ZjA1NTg0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL3Rlc3RfcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNWZhMTM5M2UtMGM1MC00YjM3LTgyNzMtNGJlMzY5MzdhZDdjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3RyYXBpX3Rlc3QiLCJzZXNzaW9uX3N0YXRlIjoiYjk5MGZmODktOTgwNy00MDJmLTkyNWUtY2VmMTY3ZmU3NzIxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjEzMzciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3RfdXNlciJ9.h7ckfXRU5LI4rvy5JF0EHMk0FDEwlRzPHAtGRFOsbFTCY-HiVDjyB5nZNEgrje6c48cDMbtLIQrcnLnl6rXOyR06MtGUfam_gwJfv7GM-wseoCVcTEmyRnyymzk-O2GFfmHSUb1V07R2I6OQzSX1IJMzhhkQtRU30ZZVhP0yRVXym2BYzdymv8lqndm-lJ7RoqtzXypEzDYnqeJ4e6JipKDyjlZ4TnhWNtDrZpXK7g6GzHCXHMyxLUMsCwjcJeAB0jHMVTspzDj0JLLB-ZY-5LEsUmigK--054JWuwqWTm0FYMxH7t-4Wi9r0F9KhJ1PHgJOQdnecU4jh4c-cmcjJw')
    .then(result => console.log("Function Result:", result))
    .catch(err => console.log("Function Error:", err));
}
