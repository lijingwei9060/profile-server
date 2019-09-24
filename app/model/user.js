'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = mongoose.Schema({
        name: { type: String, required: true, allowEmpty: false, unique: true, description: "登录用户名" },
        mobile: { type: String, required: true, allowEmpty: false, unique: true, description: "手机号码" },
        realName: { type: String, required: true, allowEmpty: false, description: "真实姓名" },
        password: { type: String, description: "加密后密码", select: false },
        email: { type: String, description: "邮箱" },
        role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
        extra: { type: mongoose.Schema.Types.Mixed },
        status: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
    });
    return mongoose.model('User', UserSchema);
}