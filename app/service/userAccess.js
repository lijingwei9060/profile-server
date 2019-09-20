'use strict';
const Service = require('egg').Service;

class UserAccessService extends Service{
    async login(payload){
        const { ctx, service } = this;
        const user = await service.user.findByMobile(payload.mobile);
        if(!user || !user.status){
            ctx.throw(404, 'user not found')
        }

        let verifyPsw = await ctx.compare(payload.password, user.password);
        if(!verifyPsw) {
            ctx.throw(404, 'user password is error')
        }

        // 生成Token令牌
        return { token: await service.actionToken.apply(user._id) }
    }

    async logout(){

    }
    
    async resetPassword(values){
        const { ctx, service } = this;
        // ctx.state.user 可以提取到JWT编码的data
        const _id = ctx.state.user.data._id;
        const user = await service.user.find(_id);
        if (!user || !user.status) {
            ctx.throw(404, 'user is not found');
        }

        // 不需要对比原先的密码，可以直接修改
        // let verifyPsw = await ctx.compare(values.oldPassword, user.password);
        // if (!verifyPsw) {
        //   ctx.throw(404, 'user password error');
        // } 
        //重置密码
        values.password = await ctx.genHash(values.password);
        const data = await service.user.findByIdAndUpdate(_id, values);
        return service.user.modifyAttrs(data);  
    }

    async current(){
        const { ctx, service } = this;
         // ctx.state.user 可以提取到JWT编码的data
        const _id = ctx.state.user.data._id;
        const user = await service.user.show(_id);
        if (!user || !user.status) {
            ctx.throw(404, 'user is not found');
        }
        
        return user;
    }

     // 修改个人信息
    async resetSelf(values) {
        const {ctx, service} = this;
        // 获取当前用户
        const _id = ctx.state.user.data._id;
        const user = await service.user.show(_id);
        if (!user|| !user.status) {
            ctx.throw(404, 'user is not found');
        }
        const data = await service.user.findByIdAndUpdate(_id, values);
        return service.user.modifyAttrs(data);
    }
}

module.exports = UserAccessService;