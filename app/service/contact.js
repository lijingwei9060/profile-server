'use strict';
const Service = require('egg').Service;

class CustomerService extends Service{
    async create(payload){
        const { ctx, service } = this;
        const data = await ctx.model.Contact.create(payload);
        return service.contact.modifyAttrs(data);
    }
    
    async destroy(_id){
        const { ctx, service } = this;
        const contact = await service.contact.find(_id);
        if(!contact){
            ctx.throw(404, 'contact not found');
        }

        return ctx.model.Contact.findByIdAndRemove(_id);
    }

    async update(_id, payload){
        const { ctx, service } = this;
        const contact = await service.contact.find(_id);
        if( !contact){
            ctx.throw(404, 'contact not found');
        }

        const data = await  service.contact.findByIdAndUpdate(_id, payload);
        return service.contact.modifyAttrs(data);
    }

    async show(_id){
        const contact = await this.ctx.service.contact.find(_id);
        if(!contact){
            this.ctx.throw(404, 'contact not found')
        }
        const res = await this.ctx.model.Contact.findById(_id);
        return this.ctx.service.contact.modifyAttrs(res);
    }

    async index(payload){
        const { currentPage = 1, pageSize = 10, isPaging, search, customer, sorter } = payload
        let res = []
        let count = 0
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)

        //构建搜索参数
        const searchParams = {};
        if (search) {
            searchParams['name'] = { $regex: search };
        }
        if (customer){
            searchParams['customer'] = customer;
        }

        const sortPramas = {};
        if (sorter){
            const s = sorter.split('_');
            if (s[1] === 'descend'){
                const ss = {};
                ss[s[0]] = -1;
                sortPramas[s[0]] = -1;
            }else{
                const ss = {};
                ss[s[0]] = 1;
                sortPramas[s[0]] = 1;
            }
        }else{
            sortPramas['createdAt'] =  -1 ;
        }

        if(isPaging) {
          if(Object.keys(searchParams).length > 0) {
            res = await this.ctx.model.Contact.find(searchParams).populate('customer','name').skip(skip).limit(Number(pageSize)).sort(sortPramas).exec()
            count = res.length
          } else {
            res = await this.ctx.model.Contact.find({}).populate('customer','name').skip(skip).limit(Number(pageSize)).sort(sortPramas).exec()
            count = await this.ctx.model.Contact.count({}).exec()
          }
        } else {
          if(Object.keys(searchParams).length > 0) {
            res = await this.ctx.model.Contact.find(searchParams).populate('customer','name').sort(sortPramas).exec()
            count = res.length
          } else {
            res = await this.ctx.model.Contact.find({}).populate('customer','name').sort(sortPramas).exec()
            count = await this.ctx.model.Contact.count({}).exec()
          }
        }
        const data = this.service.contact.modifyAttrs(res);
        return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
    }

    async removes(payload){
        return this.ctx.model.Contact.remove({ _id: { $in: payload } })
    }

    async find(id){
        return this.ctx.model.Contact.findById(id).populate('customer','name');
    }

    async findByIdAndUpdate(id, values){
        return this.ctx.model.Contact.findByIdAndUpdate(id, values, {new: true}).populate('customer','name');
    }

    modifyAttrs(data){
        return data;
     }
}

module.exports = CustomerService;