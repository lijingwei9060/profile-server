'use strict';
const Service = require('egg').Service;

class UserService extends Service{
    async create(payload){
        const { ctx, service } = this;
        const role = await service.role.show(payload.role);
        if(!role){
            ctx.throw(404, 'role is not found.');
        }
        // TODO: 修改上传的密码，
        payload.password = await this.ctx.genHash(payload.password);
        const doc = await ctx.model.User.create(payload);
        const data = await doc.populate('role').execPopulate();
        return service.user.modifyAttrs(data);
    }
    
    async destroy(_id){
        const { ctx, service } = this;
        const user = await service.user.find(_id);
        if(!user){
            ctx.throw(404, 'user not found');
        }

        return ctx.model.User.findByIdAndRemove(_id);

    }

    async update(_id, payload){
        const { ctx, service } = this;
        const user = await service.user.find(_id);
        if( !user){
            ctx.throw(404, 'user not found');
        }

        const data = await  service.user.findByIdAndUpdate(_id, payload);
        return service.user.modifyAttrs(data);
    }

    async show(_id){
        const user = await this.ctx.service.user.find(_id);
        if(!user){
            this.ctx.throw(404, 'user not found')
        }
        const res = await this.ctx.model.User.findById(_id).populate('role');
        return this.ctx.service.user.modifyAttrs(res);
    }

    async index(payload){
        const { currentPage = 1, pageSize = 10, isPaging, search } = payload
        let res = []
        let count = 0
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
        if(isPaging) {
          if(search) {
            res = await this.ctx.model.User.find({mobile: { $regex: search } }).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = res.length
          } else {
            res = await this.ctx.model.User.find({}).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = await this.ctx.model.User.count({}).exec()
          }
        } else {
          if(search) {
            res = await this.ctx.model.User.find({mobile: { $regex: search } }).populate('role').sort({ createdAt: -1 }).exec()
            count = res.length
          } else {
            res = await this.ctx.model.User.find({}).populate('role').sort({ createdAt: -1 }).exec()
            count = await this.ctx.model.User.count({}).exec()
          }
        }
        const data = this.service.user.modifyAttrs(res);
        return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
    }

    async removes(payload){
        return this.ctx.model.User.remove({ _id: { $in: payload } })
    }

    async findByMobile(mobile){
        return this.ctx.model.User.findOne({mobile: mobile}).select('+password').exec();
    }

    async find(id){
        return this.ctx.model.User.findById(id)
    }

    async findByIdAndUpdate(id, values){
        // new:true，返回修改后的数据，否则返回修改前的数据。
        return this.ctx.model.User.findByIdAndUpdate(id, values, {new: true}).populate('role');
    }

    modifyAttrs(data){
        if ( Object.prototype.toString.call(data) === '[object Array]' ){
             let res = data.map((e,i) => {
                 const jsonObject = Object.assign({}, e._doc)
                 jsonObject.key = i
                 //jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
                 jsonObject.id = e._id;
                 delete jsonObject._id;
                 delete jsonObject.__v;

                 if (jsonObject.role ){
                    let role  = Object.assign({}, e._doc.role._doc);
                    role.id = role._id;
                    delete role._id;
                    delete role.__v;
                    jsonObject["role"] = role;
                 }
                 return jsonObject;
             })
             return res;
        }else{
             let res = Object.assign({}, data._doc);
             res.id = data._id;
             delete res._id;
             delete res.__v;
             if (res["role"]){
                let role  = Object.assign({}, data._doc.role._doc);
                role.id = role._id;
                delete role._id;
                delete role.__v;
                res["role"] = role;
             }
             return res;
        }
     }
}

module.exports = UserService;