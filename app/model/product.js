'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const ProductSchema = mongoose.Schema({
        code: { type: String, required: true, allowEmpty: false, description: '产品编码' },
        name: { type: String, required: true, allowEmpty: false, description: '产品名称' },
        unit: { type: String, required: true, allowEmpty: false, description: '产品单位' },
        count: { type: Number, required: true, default: 0, description: '产品数量' },
        desc: { type: String, description: '备注' },
        createdAt: { type: Date, default: Date.now, description: '下单日期' },
        deliveryAt: { type: Date, description: '发放日期' },
        order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' ,description: '订单'},
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', description: '创建人' },
    });
    return mongoose.model('Product', ProductSchema);
}