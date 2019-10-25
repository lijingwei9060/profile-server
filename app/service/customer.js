'use strict';
const Service = require('egg').Service;

class CustomerService extends Service{
    async create(payload){
        const { ctx, service } = this;
        // ctx.state.user 可以提取到JWT编码的data
        const _id = ctx.state.user.data._id;
        payload.createdBy = _id;
        const doc = await ctx.model.Customer.create(payload);
        const data = await doc.populate('createdBy', 'realName').execPopulate();
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
        return this.ctx.service.customer.modifyAttrs(customer);
    }

    async index(payload){
        const { currentPage = 1, pageSize = 10, isPaging, search, sorter } = payload;
        let res = []
        let count = 0
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)

        //构建搜索参数
        const searchParams = {};
        if (search) {
            searchParams['name'] = { $regex: search };
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
            res = await this.ctx.model.Customer.find(searchParams)
                .populate('createdBy','realName')
                .skip(skip).limit(Number(pageSize)).sort(sortPramas).exec();
            count = res.length
          } else {
            res = await this.ctx.model.Customer.find({})
                .populate('createdBy','realName')
                .skip(skip).limit(Number(pageSize)).sort(sortPramas).exec();
            count = await this.ctx.model.Customer.count({}).exec()
          }
        } else {
          if(Object.keys(searchParams).length > 0) {
            res = await this.ctx.model.Customer.find(searchParams)
                .populate('createdBy','realName')
                .sort(sortPramas).exec();
            count = res.length
          } else {
            res = await this.ctx.model.Customer.find({})
                .populate('createdBy','realName')
                .sort(sortPramas).exec();
            count = await this.ctx.model.Customer.count({}).exec()
          }
        }
        const data = this.modifyAttrs(res);
        return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
    }

    async removes(payload){
        return this.ctx.model.Customer.remove({ _id: { $in: payload } })
    }

    async find(id){
        return this.ctx.model.Customer.findById(id).populate('createdBy', 'realName');
    }

    async findByIdAndUpdate(id, values){
        return this.ctx.model.Customer.findByIdAndUpdate(id, values, {new: true}).populate('createdBy', 'realName');
    }

    modifyAttrs(data){
        return data;
     }
}

module.exports = CustomerService;