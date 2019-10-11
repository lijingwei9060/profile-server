'use strict';
const CrudController = require('./crud');

class ProductController extends CrudController{
    constructor(ctx){
        super(ctx);
        this.createRule = {
            name: { type: 'string', required: true, allowEmpty: false },
            code: { type: 'string', required: true, allowEmpty: false, },
            name: { type: 'string', required: true, allowEmpty: false, },
            unit: { type: 'string', required: true, allowEmpty: false, },
            count: { type: 'int', required: true, default: 0 },
        };
        this.updateRule = {
            name: { type: 'string', required: true, allowEmpty: false },
            code: { type: 'string', required: true, allowEmpty: false, },
            name: { type: 'string', required: true, allowEmpty: false, },
            unit: { type: 'string', required: true, allowEmpty: false, },
            count: { type: 'int', required: true, default: 0 },
        };
        this.serviceName = 'product';
    }
}

module.exports = ProductController;