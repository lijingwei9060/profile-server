'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const CustomerSchema = mongoose.Schema({
        name: { type: String, required: true, allowEmpty: false, description: "客户名称" },
        channel: { type: String, required: true, allowEmpty: false, description: "行业"},
        url: { type: String, description: "公司网址" },
        addr: { type: String, description: "公司地址" },
        up: { type: String, description: "上级主管单位" },
        sales:  { type:mongoose.Schema.Types.ObjectId, ref: 'User', description: '销售'},
        createdBy: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: {type: Date, default: Date.now, description: "创建日期"},
    });

    return mongoose.model('Customer', CustomerSchema);
}
