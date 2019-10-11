'use strict';
const Service = require('egg').Service;

class RoleService extends Service {
    //create role
    async create(payload){
        let data = await this.ctx.model.Role.create(payload);
        return this.service.role.modifyAttrs(data);
    };

    async destroy(_id){
        const { ctx, service } = this;
        const role = await service.role.find(_id);
        if(!role){
            ctx.throw(404, 'role not found');
        }
        return ctx.model.Role.findByIdAndRemove(_id);
    }

    async update(_id, payload){
        const { ctx, service } = this;
        const role = ctx.service.role.find(_id);
        if(!role){
            ctx.throw(404, 'role not found');
        }
        const data = await ctx.model.Role.findByIdAndUpdate(_id, payload, {new: true});
        return ctx.service.role.modifyAttrs(data);
    }

    async index(payload){
        const { currentPage = 1, pageSize = 10, isPaging, search } = payload
        let res = []
        let count = 0
        let skip = ((Number(currentPage )) - 1) * Number(pageSize)
        if(isPaging) {
            if(search) {
              res = await this.ctx.model.Role.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
              count = res.length
            } else {
              res = await this.ctx.model.Role.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
              count = await this.ctx.model.Role.count({}).exec()
            }
        } else {
            if(search) {
              res = await this.ctx.model.Role.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
              count = res.length
            } else {
              res = await this.ctx.model.Role.find({}).sort({ createdAt: -1 }).exec()
              count = await this.ctx.model.Role.count({}).exec()
            }
        }

        let data = this.service.role.modifyAttrs(res);
        return { count: count, list: data, pageSize: Number(pageSize ), currentPage: Number(currentPage) }
    }

    async show(_id) {
        const role = await this.ctx.service.role.find(_id)
        if (!role) {
          this.ctx.throw(404, 'role not found')
        }

        return this.service.role.modifyAttrs(role);
    }

    async removes(values) {
        return this.ctx.model.Role.remove({ _id: { $in: values } })
    }

    async find(id){
        return this.ctx.model.Role.findById(id);
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
                return jsonObject;
            })
            return res;
       }else{
            const res = Object.assign({}, data._doc);
            res.id = data._id;
            delete res._id;
            delete res.__v;
            return res;
       }
    }
};
module.exports = RoleService;