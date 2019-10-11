'use strict';

const Controller = require('egg').Controller;

class CrudController extends Controller{
    constructor(ctx){
        super(ctx);
        // TODO: 初始化createRule、updateRule
        // TODO: 初始化serviceName
    }

    //创建
    async create(){
        const { ctx, service, serviceName} = this;
        // 如果设置了createRule
        if (this.createRule){
            const errors =  ctx.app.validator.validate(this.createRule, ctx.request.body);
            if(errors){
                ctx.helper.failure({ctx, code:422, msg:errors});
            }
        }
        
        const payload = ctx.request.body || {};
        try{
            const res = await service[serviceName].create(payload);
            ctx.helper.success({ctx, res});
        }catch(err){
            //可能的错误：
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }
    //删除
    async destroy(){
        const { ctx, service, serviceName } = this;
        const { id } = ctx.params;
        await service[serviceName].destroy(id);
        ctx.helper.success({ctx});
    }
    
    //修改
    async update(){
        const { ctx, service, serviceName }= this;
        if ( this.updateRule){
            const errors =  ctx.app.validator.validate(this.createRule, ctx.request.body);
            if(errors){
                ctx.helper.failure({ctx, code:422, msg:errors});
            }
        }

        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        try{
            const res = await service[serviceName].update(id, payload);
            ctx.helper.success({ctx, res});
        }catch(err){
            //可能的错误：
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }

    //查询
    async show(){
        const { ctx, service, serviceName } = this;
        const { id  } = ctx.params;
        try{
            const res = await service[serviceName].show(id);
            ctx.helper.success({ctx, res}); 
        }catch(err){
            //可能的错误：
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }
    //列表
    async index(){
        const { ctx, service, serviceName } = this;
        const payload = ctx.query;
        try{
            const res = await service[serviceName].index(payload);
            ctx.helper.success({ctx, res});
        }catch(err){
            //可能的错误：
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }
    //批量删除
    async removes(){
        const { ctx, service, serviceName } = this;
        const { id } = ctx.request.body ;
        const payload = id.splict(',')||[];
        const res = await service[serviceName].removes(payload);
        ctx.helper.success({ctx, res});
    }
}

module.exports = CrudController;