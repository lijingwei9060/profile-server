'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /api/user', () => {
    return app.httpRequest()
      .get('/api/user')
      .expect(200)
      .expect('Content-Type', /json/);
  });

//   it('should POST /api/user', () => {
//     return app.httpRequest()
//       .post('/api/user')
//       .expect(200)
//       .expect('Content-Type', /json/);
//   });
});
