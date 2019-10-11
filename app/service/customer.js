'use strict';
const Service = require('egg').Service;

class CustomerService extends Service{
    async create(payload){
        const { ctx, service } = this;
        // ctx.state.user 可以提取到JWT编码的data
        const _id = ctx.state.user.data._id;
        payload.createdBy = _id;
        const doc = await ctx.model.Customer.create(payload);
        const data = await doc.populate('createdBy').execPopulate();
        return service.customer.modifyAttrs(data);
    }
    
    async destroy(_id){
        const { ctx, service } = this;
        const customer = await service.customer.find(_id);
        if(!customer){
            ctx.throw(404, 'customer not found');
        }

        return ctx.model.Customer.findByIdAndRemove(_id);

    }

    async update(_id, payload){
        const { ctx, service } = this;
        const customer = await service.customer.find(id);
        if( !customer){
            ctx.throw(404, 'customer not found');
        }

        const data = await  service.customer.findByIdAndUpdate(_id, payload);
        return service.customer.modifyAttrs(data);
    }

    async show(_id){
        const customer = await this.ctx.service.customer.find(_id);
        if(!customer){
            this.ctx.throw(404, 'customer not found')
        }
        const res = await this.ctx.model.Customer.findById(_id).populate('createdBy');
        return this.ctx.service.customer.modifyAttrs(res);
    }

    async index(payload){
        const { currentPage = 1, pageSize = 10, isPaging, search } = payload
        let res = []
        let count = 0
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
        if(isPaging) {
          if(search) {
            res = await this.ctx.model.Customer.find({name: { $regex: search } }).populate('createdBy').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = res.length
          } else {
            res = await this.ctx.model.Customer.find({}).populate('createdBy').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = await this.ctx.model.Customer.count({}).exec()
          }
        } else {
          if(search) {
            res = await this.ctx.model.Customer.find({name: { $regex: search } }).populate('createdBy').sort({ createdAt: -1 }).exec()
            count = res.length
          } else {
            res = await this.ctx.model.Customer.find({}).populate('createdBy').sort({ createdAt: -1 }).exec()
            count = await this.ctx.model.Customer.count({}).exec()
          }
        }
        const data = this.service.customer.modifyAttrs(res);
        return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
    }

    async removes(payload){
        return this.ctx.model.Customer.remove({ _id: { $in: payload } })
    }

    async find(id){
        return this.ctx.model.Customer.findById(id)
    }

    async findByIdAndUpdate(id, values){
        return this.ctx.model.Customer.findByIdAndUpdate(id, values).populate('createdBy');
    }

    modifyAttrs(data){
        if ( Object.prototype.toString.call(data) === '[object Array]' ){
             let res = data.map((e,i) => {
                 const jo = Object.assign({}, e._doc)
                 //jo.createdAt = this.ctx.helper.formatTime(e.createdAt)
                 jo.id = e._id;
                 delete jo._id;
                 delete jo.__v;

                // 替换createdBy
                // if (jo.createdBy ){
                //     let createdBy  = Object.assign({}, e._doc.createdBy._doc);
                //     createdBy.id = createdBy._id;
                //     delete createdBy._id;
                //     delete createdBy.__v;
                //     jo["createdBy"] = createdBy;
                // }

                return jo;
             })
             return res;
        }else{
             let res = Object.assign({}, data._doc);
             res.id = data._id;
             delete res._id;
             delete res.__v;

             // 替换createdBy
             if (res["createdBy"]){
                let createdBy  = Object.assign({}, data._doc.createdBy._doc);
                createdBy.id = createdBy._id;
                delete createdBy._id;
                delete createdBy.__v;
                res["createdBy"] = createdBy;
             }
             return res;
        }
     }
}

module.exports = CustomerService;