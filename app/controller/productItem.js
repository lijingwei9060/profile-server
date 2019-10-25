'use strict';
const CrudController = require('./crud');

class ProductItemController extends CrudController{
    constructor(ctx){
        super(ctx);
        this.createRule = {
            name: { type: 'string', required: true, allowEmpty: false },
            code: { type: 'string', required: true, allowEmpty: false, },
            name: { type: 'string', required: true, allowEmpty: false, },
        };
        this.updateRule = {
            name: { type: 'string', required: true, allowEmpty: false },
            code: { type: 'string', required: true, allowEmpty: false, },
            name: { type: 'string', required: true, allowEmpty: false, },
        };
        this.serviceName = 'productItem';
    }

    async checkByCode(){
        const { ctx, service, serviceName} = this;
        // 如果设置了createRule
        const { code } = ctx.request.body;
        try{
            const res = await service[serviceName].checkByCode(code);
            ctx.helper.success({ctx, res});
        }catch(err){
            //可能的错误：
            ctx.helper.failure({ctx, code:err.status, msg:err});
        }
    }
    
}

module.exports = ProductItemController;