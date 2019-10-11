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
  // customer
  router.post('/api/customer',  app.jwt, controller.customer.create)
  router.delete('/api/customer/:id',  app.jwt, controller.customer.destroy)
  router.put('/api/customer/:id',  app.jwt, controller.customer.update)
  router.get('/api/customer/:id',  app.jwt, controller.customer.show)
  router.get('/api/customer',  app.jwt, controller.customer.index)
  router.delete('/api/customer',app.jwt,  controller.customer.removes)
    
  // contact
  router.post('/api/contact',  app.jwt, controller.contact.create)
  router.delete('/api/contact/:id',  app.jwt, controller.contact.destroy)
  router.put('/api/contact/:id',  app.jwt, controller.contact.update)
  router.get('/api/contact/:id',  app.jwt, controller.contact.show)
  router.get('/api/contact',  app.jwt, controller.contact.index)
  router.delete('/api/contact',app.jwt,  controller.contact.removes)

  // order
  router.post('/api/order',  app.jwt, controller.order.create)
  router.delete('/api/order/:id',  app.jwt, controller.order.destroy)
  router.put('/api/order/:id',  app.jwt, controller.order.update)
  router.get('/api/order/:id',  app.jwt, controller.order.show)
  router.get('/api/order',  app.jwt, controller.order.index)
  router.delete('/api/order',app.jwt,  controller.order.removes)

};
