'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller

class UserAccessController extends Controller {

  constructor(ctx) {
    super(ctx)

    this.UserLoginTransfer = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false }
    }

    this.UserResetPswTransfer = {
      password: { type: 'password', required: true, allowEmpty: false, min: 6 },
    }

    this.UserUpdateTransfer = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/}
    }
  }

  // 用户登入
  async login() {
    const { ctx, service } = this;
    // 校验参数
    
    const errors =  ctx.app.validator.validate(this.UserLoginTransfer, ctx.request.body);
    if(errors){
      ctx.helper.failure({ctx, code:422, msg:errors});
    }
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    try{
      const res = await service.userAccess.login(payload);
      // 设置响应内容和响应状态码
      ctx.helper.success({ctx, res});
    }catch(err){
      //可能的错误：
      //用户不存在等
      ctx.helper.failure({ctx, code:err.status, msg:err});
    }

  }

  // 用户登出
  async logout() {
    const { ctx, service } = this
    // 调用 Service 进行业务处理
    await service.userAccess.logout()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
  
  // 修改密码
  async resetPassword() {
    const { ctx, service } = this
    // 校验参数
    const errors =  ctx.app.validator.validate(this.UserResetPswTransfer, ctx.request.body);
    if(errors){
      ctx.helper.failure({ctx, code:422, msg:errors})
    }
    // 组装参数
    const payload = ctx.request.body || {}
    try{
       // 调用 Service 进行业务处理
      await service.userAccess.resetPassword(payload)
      // 设置响应内容和响应状态码
      ctx.helper.success({ctx})
    }catch(err){
      //可能的错误：
      //用户不存在等
      ctx.helper.failure({ctx, code:err.status, msg:err});
    }
   
  }

  // 获取用户信息
  async current() {
    const { ctx, service } = this
    try{
      const res = await service.userAccess.current()
      // 设置响应内容和响应状态码
      ctx.helper.success({ctx, res})
    }catch(err){
      //可能的错误：
      //用户不存在等
      ctx.helper.failure({ctx, code:err.status, msg:err});
    }

  }

  // 修改基础信息
  async resetSelf() {
    const {ctx, service} = this
    // 校验参数
    const errors =  ctx.app.validator.validate(this.UserUpdateTransfer, ctx.request.body);
    if(errors){
      ctx.helper.failure({ctx, code:422, msg:errors})
    }
    // 组装参数
    const payload = ctx.request.body || {}
    try{
      // 调用Service 进行业务处理
      await service.userAccess.resetSelf(payload)
      // 设置响应内容和响应状态码
      ctx.helper.success({ctx})
    }catch(err){
      //可能的错误：
      //用户不存在等
      ctx.helper.failure({ctx, code:err.status, msg:err});
    }
    
  }

}

module.exports = UserAccessController