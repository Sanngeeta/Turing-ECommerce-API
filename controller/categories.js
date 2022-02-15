const knex = require('../model/database')


// Get categories datas
Get_categories = (req, res) => {
    let oderList = []
    let oderQuery = req.query.order


    let page = req.query.page
    let limit = req.query.limit
    let description=req.query.description

    if (oderQuery) {
        let order = oderQuery.split(',')
            // console.log(order)
        oderList.push({ 'column': order[0], 'limit': order[1] })
        console.log(oderList)
    }
    if (page && limit) {
        page = parseInt(page) //page kitane chahiye wo intger me hoga
        limit = parseInt(limit) //limit kitani chahiye wo intger me hoga
        page = page * limit - limit //page and limit * karne ke bad limit ko minus krta hai to esme page ki limit aati hai 
    } else {
        page = 0
        limit = 7
    }
    knex.select('*').from('category').orderBy(oderList).limit(limit).offset(page)
        .then((getCate) => {
            for (i of getCate){
                console.log(i);
                if (description!=undefined){
                    i.description=i.description.slice(0,parseInt(description))
                    
                }
            }
            res.json({

                message: 'categories datas',
                count: 7,
                row: getCate
            })
        }).catch((err) => {
            console.log(err)
            res.send({
                succes: false,
                status: 406,
                message: 'The order is not macth,field,(desc/asc)'
            })
        })

}


// Get categories data by categories_id
Get_categories_byId = (req, res) => {
    knex.select('*').from('category').where('category_id', '=', req.params.category_id)
        .then((category_id) => {
            res.json({
                succes: true,
                status: 200,
                message: 'categories datas',
                All_categories: category_id
            })

        }).catch((err) => {
            res.send({
                succes: false,
                status: 406,
                message: 'categories by id data not found'
            })

        })

}


Get_join_category_product = (req, res) => {
    knex('category')
        .join('product_category', 'product_category.category_id', 'category.category_id')
        .select('product_category.category_id', 'department_id', 'category.name').where('product_category.product_id', '=', req.params.product_id)
        // .select('category_id','department_id','category.name').where('product_category.product_id','=',req.params.product_id)
        .then((byProductId) => {
            res.json({
                succes: true,
                status: 200,
                message: 'Get Data By Product Id',
                All_categories: byProductId
            })

        }).catch((err) => {
            console.log(err)
            res.send({
                succes: false,
                status: 406,
                message: 'Error data not found'
            })


        })
}






// Join to table category into department table and find the data using from department id.
Get_join_category_department = (req, res) => {
    knex('category')
        .innerJoin('department', 'category.department_id', 'department.department_id')
        .select('category_id', 'category.name', 'category.description', 'department.department_id').where('category.department_id', '=', req.params.department_id)
        .then((byDepartId) => {
            res.json({
                succes: true,
                status: 200,
                message: 'Get Data By Department Id',
                All_categories: byDepartId
            })

        }).catch((err) => {
            console.log(err)
            res.send({
                succes: false,
                status: 406,
                message: 'Error data not found'
            })


        })
}


















module.exports = { Get_categories, Get_categories_byId, Get_join_category_product, Get_join_category_department }