'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const ProductItemSchema = mongoose.Schema({
        code: { type: String, unique: true, required: true, allowEmpty: false, description: '产品编码' },
        name: { type: String, required: true, allowEmpty: false, description: '产品名称' },
        unit: { type: String, required: true, allowEmpty: false, description: '产品单位' },
        desc: { type: String, description: '备注' },
        status: { type: Boolean, default: true, description: '商品状态'},
        createdAt: { type: Date, default: Date.now, description: '创建日期' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', description: '创建人' },
    }, {versionKey: false});
    return mongoose.model('ProductItem', ProductItemSchema);
}