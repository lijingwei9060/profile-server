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
}

module.exports = ProductItemController;