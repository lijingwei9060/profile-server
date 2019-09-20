'use strict';

const Controller = require('egg').Controller;

class CustomerController extends Controller{
    constructor(ctx){
        super(ctx);
        this.createRule = {
            name: { type: 'string', required: true, allowEmpty: false },
            channel: { type: 'string', required: true, allowEmpty: false},
        };
    }

    //创建
    async create(){
        const { ctx, service } = this;
        ctx.validate(this.createRule);
        const payload = ctx.request.body || {};
        const res = service.customer.create(payload);
        ctx.helper.success({ctx, res});
    }
    //删除
    async destroy(){
        const { ctx, service } = this;
        const { id } = ctx.params;
        await service.customer.destroy(id);
        ctx.helper.success({ctx});
    }
    
    //修改
    async update(){
        const { ctx, service }= this;
        ctx.validate(this.createRule);

        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        const res = await service.customer.update(id, payload);
        ctx.helper.success({ctx, res});
    }

    //查询
    async show(){
        const { ctx, service } = this;
        const { id  } = ctx.params;
        const res = await service.customer.show(id);
        ctx.helper.success({ctx, res}); 
    }
    //列表
    async index(){
        const { ctx, service } = this;
        const payload = ctx.query;
        const res = await service.customer.index(payload);
        ctx.helper.success({ctx, res});
    }
    //批量删除
    async removes(){
        const { ctx, service } = this;
        const { id } = ctx.request.body ;
        const payload = id.splict(',')||[];
        const res = await service.customer.removes(payload);
        ctx.helper.success({ctx, res});
    }
}

module.exports = CustomerController;