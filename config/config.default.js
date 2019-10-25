/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568261525936_2674';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    myAppName: 'Profile Manager',
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: ['http://localhost:8000','http://127.0.0.1:8000','http://114.67.22.39','http://114.67.22.39:8000','https://114.67.22.39','https://114.67.22.39:8000']
      
    },
    cors: {
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    bcrypt: {
      saltRounds: 10 // default 10
    },
    mongoose: {
      url: `mongodb://${process.env.DATABASE_HOST || '127.0.0.1'}:27017/profile`,
      options: {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        bufferMaxEntries: 0,
      },
    },
    jwt: {
      secret: '906015',
      enable: true, // default is false
      match: '/jwt', // optional
    }
  
  };

  return {
    ...config,
    ...userConfig,
  };
};
