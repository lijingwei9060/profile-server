'use strict';

module.exports = app =>{
    const mongoose = app.mongoose;
    const ContactSchema = mongoose.Schema({
        name: { type: String, required: true, allowEmpty: false, description: "姓名" },
        title: {type: String, description: "职位" },
        mobile: { type: String, description: "手机号码" },
        email: { type: String, description: "邮箱" },
        status: { type: Boolean, default: true, description: "联系人状态，false表示已经不在"},
        dep: { type: String, description: '部门' },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true, allowEmpty: false, description: "客户" },
        createdAt: { type: Date, default: Date.now, description: '创建时间' },
    }, {versionKey: false})
    return mongoose.model('Contact', ContactSchema);
}