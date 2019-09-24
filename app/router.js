'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // role
  router.delete('/api/role', app.jwt,controller.role.removes)
  router.post('/api/role',  app.jwt, controller.role.create)
  router.delete('/api/role/:id',  app.jwt, controller.role.destroy)
  router.put('/api/role/:id',  app.jwt, controller.role.update)
  router.get('/api/role/:id',  app.jwt, controller.role.show)
  router.get('/api/role',  app.jwt, controller.role.index)
  router.resources('role', '/api/role', controller.role)

  // userAccess
  router.post('/api/user/access/login', controller.userAccess.login)
  router.get('/api/user/access/current', app.jwt, controller.userAccess.current)
  router.get('/api/user/access/logout', controller.userAccess.logout)
  router.put('/api/user/access/resetPassword', app.jwt, controller.userAccess.resetPassword)

  // user
  router.post('/api/user',  app.jwt, controller.user.create)
  router.delete('/api/user/:id',  app.jwt, controller.user.destroy)
  router.put('/api/user/:id',  app.jwt, controller.user.update)
  router.get('/api/user/:id',  app.jwt, controller.user.show)
  router.get('/api/user',  app.jwt, controller.user.index)
  router.delete('/api/user',app.jwt,  controller.user.removes)
  // router.resources('user', '/api/user', controller.user)
};
