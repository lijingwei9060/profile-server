'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const AppKeySchema = mongoose.Schema({
        name: { type: String, required: true, allowEmpty: false, description: "应用名称" },
        secKey: { type: String, required: true, allowEmpty: false, description: "应用key" },
        to: { type: Date, required: true, allowEmpty: false, description: "有效期至" },
        createdAt: { type: Date, default: Date.now, description: "创建时间" },
        status: { type: Boolean, default: true, description: "appkey状态，false表示失效"},
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true, allowEmpty: false, description: "客户"},
    });
    return mongoose.model('AppKey', AppKeySchema);
}