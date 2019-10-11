'use strict';

const Controller = require('egg').Controller;

class ContactController extends Controller{
    constructor(ctx){
        super(ctx);
        this.createRule = {
            name: { type: 'string', required: true, allowEmpty: false },
            customer: { type: 'string', required: true, allowEmpty: false},
        };
    }

    //创建
    async create(){
        const { ctx, service } = this;
        const errors =  ctx.app.validator.validate(this.createRule, ctx.request.body);
        if(errors){
            ctx.helper.failure({ctx, code:422, msg:errors});
        }
        const payload = ctx.request.body || {};
        try{
            const res = await service.contact.create(payload);
            ctx.helper.success({ctx, res});
        }catch(err){
            //可能的错误：
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }
    //删除
    async destroy(){
        const { ctx, service } = this;
        const { id } = ctx.params;
        await service.contact.destroy(id);
        ctx.helper.success({ctx});
    }
    
    //修改
    async update(){
        const { ctx, service }= this;
        const errors =  ctx.app.validator.validate(this.createRule, ctx.request.body);
        if(errors){
            ctx.helper.failure({ctx, code:422, msg:errors});
        }

        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        try{
            const res = await service.contact.update(id, payload);
            ctx.helper.success({ctx, res});
        }catch(err){
            //可能的错误：
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }

    //查询
    async show(){
        const { ctx, service } = this;
        const { id  } = ctx.params;
        try{
            const res = await service.contact.show(id);
            ctx.helper.success({ctx, res}); 
        }catch(err){
            //可能的错误：
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }
    //列表
    async index(){
        const { ctx, service } = this;
        const payload = ctx.query;
        try{
            const res = await service.contact.index(payload);
            ctx.helper.success({ctx, res});
        }catch(err){
            //可能的错误：
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }
    //批量删除
    async removes(){
        const { ctx, service } = this;
        const { id } = ctx.request.body ;
        const payload = id.splict(',')||[];
        const res = await service.contact.removes(payload);
        ctx.helper.success({ctx, res});
    }
}

module.exports = ContactController;