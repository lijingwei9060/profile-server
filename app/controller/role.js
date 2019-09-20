'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller{
    constructor(ctx){
        super(ctx);
        this.createRule = {
            name: { type: 'string', required: true, allowEmpty: false },
            access: { type: 'string', required: true, allowEmpty: false},
        };
    }

    //创建role
    async create(){
        const { ctx, service } = this;
        ctx.validate(this.createRule);
        const payload = ctx.request.body || {};
        const res = service.role.create(payload);
        ctx.helper.success({ctx, res});
    }
    //删除
    async destroy(){
        const { ctx, service } = this;
        const { id } = ctx.params;
        await service.role.destroy(id);
        ctx.helper.success({ctx});
    }
    
    //修改
    async update(){
        const { ctx, service }= this;
        ctx.validate(this.createRule);

        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        const res = await service.role.update(id, payload);
        ctx.helper.success({ctx, res});
    }

    //查询
    async show(){
        const { ctx, service } = this;
        const { id  } = ctx.params;
        const res = await service.role.show(id);
        ctx.helper.success({ctx, res}); 
    }
    //列表
    async index(){
        const { ctx, service } = this;
        const payload = ctx.query;
        const res = await service.role.index(payload);
        ctx.helper.success({ctx, res});
    }
    //批量删除
    async removes(){
        const { ctx, service } = this;
        const { id } = ctx.request.body ;
        const payload = id.splict(',')||[];
        const res = await service.role.removes(payload);
        ctx.helper.success({ctx, res});
    }
}

module.exports = RoleController;