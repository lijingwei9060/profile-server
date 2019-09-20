'use strict';
module.exports = app => {
    const mongoose = require('mongoose');
    const CloudSchema = mongoose.Schema({
        name: { type: String, require: true, allowEmpty: false, description: '云平台名称'},
        BCCVersion: { type: String, description: 'bcc版本' },
        SIPVersion: { type: String, description: 'SIP版本' },
        CMPVersion: { type: String, description: 'cmp版本' },
        edtion: { type: String, description: '版本' },
        CPU: { type: Number , description: 'cpu授权数量'},
        CPUused:  {type: Number , description: 'cpu使用数量' },
        cluster: { type: Number , description: '集群数量' },
        release: { type: Date, default: Date.now, description: 'license签发日期'},
        installAt: { type: Date, default: Date.now, description: '安装日期' },
        upgradeAt: { type: Date, default: Date.now, description: '升级日期' },
        createdAt: { type: Date, default: Date.now, description: '创建日期' },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: Boolean, default: true, description: 'false表示不可用' },
    }) ;

    return mongoose.model('Cloud', CloudSchema);
}