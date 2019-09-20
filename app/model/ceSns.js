'use strict';
module.exports = app => {
    const mongoose = require('mongoose');
    const SNSSchema = mongoose.Schema({
        title: { type: String, require: true, allowEmpty: false, description: 'SNS描述' },
        edition: { type: String, description: 'SNS版本,基础版、高级版、运营版' },
        sla: { type: String, description: 'SNS服务级别，5*8,7*8，7*24' },
        contract: { type: String, description: '合同编号' },
        desc: { type: String, description: '描述' },
        from: { type: Date, default: Date.now, description: '起始时间' },
        to: { type: Date, default: Date.now, description: '结束时间' },
        status: { type: Boolean, default: true, description: 'false表示失效' },
        createdAt: { type: Date, default: Date.now, description: '创建时间' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        cloud: { type: mongoose.Schema.Types.ObjectId, ref: 'Cloud' },
    });
    return mongoose.model('SNS', SNSSchema);
}