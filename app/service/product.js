'use strict';
const Service = require('egg').Service;

class ProductService extends Service{
    /**
     * 创建Product：产品
     * @param {*} payload 
     */
    async create(payload){
        const _id = this.ctx.state.user.data._id;
        payload.createdBy = _id;
        let res = await this.ctx.model.Product.create(payload);
        const data = await res.populate('createdBy','realName').execPopulate();
        return this.modifyAttrs(data);
    }

    /**
     * 删除订单
     * @param {string} _id 删除指定Product
     */
    async destroy(_id){
        let res = await this.find(_id);
        if (!res){
            this.ctx.throw(404, 'product not found')
        }
        return await this.ctx.model.Product.findByIdAndRemove(_id);
    }

    /**
     * 更新订单
     * @param {string} _id 订单ID
     * @param {*} payload 订单属性
     */
    async update(_id, payload){
        let res = await this.find(_id);
        if (!res){
            this.ctx.throw(404, 'product not found')
        }
        let data = await this.ctx.model.Product.findByIdAndUpdate(_id, payload, {new: true});
        let ret = await data.populate('createdBy','realName').execPopulate();
        return this.modifyAttrs(ret);
    }

    /**
     * 查询订单
     * @param {string} _id 显示Product
     */
    async show(_id){
        let res = await this.find(_id);
        if (!res){
            this.ctx.throw(404, 'product not found')
        }
        
        return this.modifyAttrs(res);
    }

    /**
     * 查询订单列表
     * @param {*} payload
     */
    async index(payload){
        const { currentPage = 1, pageSize = 10, isPaging, search, order, sorter } = payload;
        let res = []
        let count = 0
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)

        //构建搜索参数
        const searchParams = {};
        if (search) {
            searchParams['name'] = { $regex: search };
        }
        if (order) {
            searchParams['order'] = order;
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
            res = await this.ctx.model.Product.find(searchParams)
                .populate('createdBy','realName')
                .skip(skip).limit(Number(pageSize)).sort(sortPramas).exec();
            count = res.length
          } else {
            res = await this.ctx.model.Product.find({})
                .populate('createdBy','realName')
                .skip(skip).limit(Number(pageSize)).sort(sortPramas).exec();
            count = await this.ctx.model.Product.count({}).exec()
          }
        } else {
          if(Object.keys(searchParams).length > 0) {
            res = await this.ctx.model.Product.find(searchParams)
                .populate('createdBy','realName')
                .sort(sortPramas).exec();
            count = res.length
          } else {
            res = await this.ctx.model.Product.find({})
                .populate('createdBy','realName')
                .sort(sortPramas).exec();
            count = await this.ctx.model.Product.count({}).exec()
          }
        }
        const data = this.modifyAttrs(res);
        return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
    }

    /**
     * 批量删除订单
     * @param {[string]} payload 批量删除订单
     */
    async removes(payload){
        return this.ctx.model.Product.remove({ _id: { $in: payload } })

    }

    /**
     * 按照ID查询
     * @param {string} id 
     */
    async find(id){
        return this.ctx.model.Product.findById(id).populate('createdBy','realName');
    }

    /**
     * 修改订单数据
     * @param {[Product]|Product} data 整理订单数据
     */
    modifyAttrs(data){
        return data;
    }
};

module.exports = ProductService;