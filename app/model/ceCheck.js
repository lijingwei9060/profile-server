'use strict';
module.exports = app => {
    const mongoose = require('mongoose');
    const CheckSchema = mongoose.Schema({
        title: { type: String, require: true, allowEmpty: false, description: '巡检标题：季度巡检' },
        from: { type: Date, default: Date.now, description: '开始时间' },
        to: { type: Date, default: Date.now, description: '结束时间' },
        schedule: { type: String, description: '频率' },
        contract: { type: String, description: '合同编号' },
        status: { type: Boolean, default: true, description: 'false表示失效' },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        cloud: { type: mongoose.Schema.Types.ObjectId, ref: 'Cloud' },
    }, {versionKey: false});

    return mongoose.model('Check', CheckSchema);
}