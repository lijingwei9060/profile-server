'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const OrderSchema = mongoose.Schema({
        name: { type: String, required: true, allowEmpty: false, description: '订单名称' },
        contractId: { type: String, description: '合同编号' },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' ,description: '客户' },
        sales: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,description: '销售' },
        createdAt: { type: Date, default: Date.now, description: '下单日期' },
        status: { type: Boolean, default: true, description: "订单有效状态"},
        projectId: { type: String, description: '项目编号' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', description: '创建人' },
    }, {versionKey: false});
    return mongoose.model('Order', OrderSchema);
}