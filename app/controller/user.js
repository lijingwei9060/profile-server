'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller{
    constructor(ctx){
        super(ctx);
        this.UserCreateTransfer = {
            name: { type: 'string', required: true, allowEmpty: false },
            mobile: { type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/ },
            realName: { type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/},
            password: { type: 'string', required: true, allowEmpty: false, min: 6 },
        };

        this.UserUpdateTransfer = {
            name: { type: 'string', required: true, allowEmpty: false },
            mobile: { type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/ },
            realName: { type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/},
        };
    }

    async create(){
        const { ctx, service } = this;
        const errors =  ctx.app.validator.validate(this.UserCreateTransfer, ctx.request.body);
        if(errors){
            ctx.helper.failure({ctx, code:422, msg:errors});
        }
        const payload = ctx.request.body|| {};
        try{
            const res = await service.user.create(payload);
            // 设置响应内容和响应状态码
            ctx.helper.success({ctx, res});
        }catch(err){
            //可能的错误：
            //用户不存在等
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }

    async destroy(){
        const { ctx, service } = this;
        const { id } = ctx.params;
        await service.user.destroy(id);
        ctx.helper.success({ctx});
    }

    async update(){
        const { ctx, service } = this;
        const { id } = ctx.params;
        const errors =  ctx.app.validator.validate(this.UserUpdateTransfer, ctx.request.body);
        if(errors){
            ctx.helper.failure({ctx, code:422, msg:errors});
        }
        const payload = ctx.request.body ||{};
        
        try{
            const res = await service.user.update(id, payload);
            ctx.helper.success({ctx, res});
        }catch(err){
            //可能的错误：
            //用户不存在等
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }

    async show() {
        const { ctx, service } = this
        // 组装参数
        const { id } = ctx.params
        try{
             // 调用 Service 进行业务处理
            const res = await service.user.show(id)
            // 设置响应内容和响应状态码
            ctx.helper.success({ctx, res})
        }catch(err){
            //可能的错误：
            //用户不存在等
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
      }
    
      // 获取所有用户(分页/模糊)
      async index() {
        const { ctx, service } = this
        // 组装参数
        const payload = ctx.query
        // 调用 Service 进行业务处理
        const res = await service.user.index(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ctx, res})
      }
    
      // 删除所选用户(条件id[])
      async removes() {
        const { ctx, service } = this
        // 组装参数
        // const payload = ctx.queries.id
        const { id } = ctx.request.body
        const payload = id.split(',') || []
        // 调用 Service 进行业务处理
        const result = await service.user.removes(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ctx})
      }
}

module.exports = UserController;