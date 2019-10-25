'use strict';
const CrudController = require('./crud');

class CustomerController extends CrudController{
    constructor(ctx){
        super(ctx);
        this.createRule = {
            name: { type: 'string', required: true, allowEmpty: false },
            channel: { type: 'string', required: true, allowEmpty: false, },
        };
        this.updateRule = {
            name: { type: 'string', required: true, allowEmpty: false },
            channel: { type: 'string', required: true, allowEmpty: false, },            
        };
        this.serviceName = 'customer';
    }
}

module.exports = CustomerController;