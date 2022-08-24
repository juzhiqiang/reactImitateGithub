const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const config = require('./config')
const SCOPE = 'user';
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    GITHUB_OAUTH_URL,
    OAUTH_URL : `${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE }`
  },
  "plugins": [
    ["styled-components", {
      ssr: true
    }]
  ]
}