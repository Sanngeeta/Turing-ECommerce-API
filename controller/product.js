const e = require('express')
const knex = require('../model/database')


// // Get product data here
get_product = (req, res) => {


    let page = req.query.page
    let limit = req.query.limit
    let description=req.query.description

    if (page && limit) {
        page = parseInt(page)
        limit = parseInt(limit)
        page = page * limit - limit
    } else {
        page = 0
        limit = 20
    }
    knex.select('product.product_id', 'product.name', 'product.description', 'product.price', 'product.discounted_price', 'product.thumbnail').from('product').limit(limit).offset(page)
        .then((get_product) => {
            for (i of get_product){
                console.log(i);
                if (description!=undefined){
                    i.description=i.description.slice(0,parseInt(description))
                    
                }
            }
            res.json({
                count: 101,
                rows: get_product
            })
        }).catch((err) => {
            console.log(err)
            console.log(err)
            res.json({
                succes: false,
                status: 405,
                message: 'error something is wrong',
            })

        })
}


// Search Product
searchProduct = (req, res) => {
    count = 0
    let search = req.query.search
    let page_q = req.query.page
    let limit = req.query.limit
    let description=req.query.description



    if (page_q && limit) {
        page_q = parseInt(page_q)
        limit = parseInt(limit)
        page_q = page_q * limit - limit

    } else {
        page_q = 0
        limit = 101
    }
    knex.select('*').from('product').where('name', 'like',
            `%${search}%`).limit(limit).offset(page_q)
        .then((search_product_data) => {
            for (i of search_product_data){
                console.log(i);
                if (description!=undefined){
                    i.description=i.description.slice(0,parseInt(description))
                    
                }
            }
            res.json({
                message: 'Your Search Product',
                count: limit,
                rows: search_product_data
            })
        }).catch((err) => {
            res.send({ message: 'This Product Not Available' })
        })
}





// Get product by product id
get_product_byId = (req, res) => {
    knex.select('*').from('product').where('product_id', req.params.product_id)
        .then((get_productById) => {
            res.json({
                sussce: true,
                status: 201,
                message: 'Get Product By Product Id ',
                product: get_productById
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 405,
                message: 'error something is wrong',
            })

        })
}



// Join to table product into category table //abhi esko shai se karna h ye pura nhi hua hai
get_product_Join_Category = (req, res) => {
    let page = req.query.page
    let limit = req.query.limit
    let description=req.query.description


    if (page && limit) {
        page = parseInt(page)
        limit = parseInt(limit)
        page = page * limit - limit
    } else {
        page = 0
        limit = 101
    }

    knex('product')
        .join('product_category', 'product.product_id', 'product_category.product_id')
        .select('product.product_id', 'product.name', 'product.description', 'product.description', 'product.price', 'product.discounted_price', 'product.thumbnail')
        .where('product_category.category_id ', req.params.category_id).limit(limit).offset(page)
        .then((categoryById) => {
            for (i of categoryById){
                console.log(i);
                if (description!=undefined){
                    i.description=i.description.slice(0,parseInt(description))
                    
                }
            }
            console.log(categoryById)
            res.json({

                message: 'Get Product By category Id ',
                count: limit,
                rows: categoryById
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 405,
                message: 'error something is wrong',
            })

        })
}






// Get data by derpartment Id
get_productBydepartmentId = (req, res) => {
    let page = req.query.page
    let limit = req.query.limit


    if (page && limit) {
        page = parseInt(page)
        limit = parseInt(limit)
        page = page * limit - limit
    } else {
        page = 0
        limit = 101
    }
    knex('product')
        .join('product_category', 'product.product_id', 'product_category.product_id')
        .join('category', 'category.category_id', 'product_category.category_id')
        .select('product.product_id', 'product.name', 'product.description', 'product.price', 'product.discounted_price', 'product.thumbnail').where('category.department_id  ', req.params.department_id).limit(limit).offset(page)
        .then((deparmentyById) => {
            for (i of deparmentyById){
                console.log(i);
                if (description!=undefined){
                    i.description=i.description.slice(0,parseInt(description))
                    
                }
            }
            console.log(deparmentyById)
            res.json({
                sussce: true,
                status: 201,
                message: 'Get Product By deparmenty Id ',
                product: deparmentyById
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 405,
                message: 'error something is wrong',
            })

        })
}








// Product data we have to get details by using product id
productDetails_byId = (req, res) => {
    knex.select('product_id', 'name', 'description', 'price', 'discounted_price', 'image', 'image_2').from('product')
        .where('product_id', req.params.product_id)
        .then((detali) => {
            res.json({
                sussce: true,
                status: 201,
                message: 'Product Detalis ',
                detali: detali
            })

        }).catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 400,
                message: 'error something is wrong',
            })

        })
}




// get data and join category department and product and get locations by product id
getLocations_join_ByproductId = (req, res) => {
    knex('product_category')
        .innerJoin('category', 'product_category.category_id', 'category.category_id')
        .join('department', 'department.department_id', 'category.department_id')
        .select({ 'category': 'category.category_id', 'category_name': 'category.name', 'department_id': 'department.department_id', 'department_name': 'department.name' })
        .where('product_category.product_id', req.params.product_id)
        .then((data) => {
            console.log(data)
            res.json({
                succes: true,
                status: 200,
                message: 'You are get data succesfully by product id',
                data: data

            })
        }).catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 402,
                message: 'Invalid product id',

            })

        })

}



// Post feedback or reviews about product
post_reviews = (req, res) => {
    if (!req.body.product_id || !req.body.review || !req.body.rating) {
        res.json({
            status: 400,
            message: 'Failed All fild Require'
        })
    } else {
        const giveReview = {
            customer_id: req.userData.customer_id,
            product_id: req.body.product_id,
            review: req.body.review,
            rating: req.body.rating,
            created_on: new Date()



        }

        knex('review').insert(giveReview)
            .then((data) => {
                knex.select('*').from('review').where('review_id', data)
                    .then((post) => {
                        res.json({
                            succes: true,
                            message: 'Your Product Review Sussecfully Sbumited!',
                            review: post
                        })
                    }).catch((err) => {
                        console.log(err)
                        res.json({
                            succes: false,
                            message: 'Product Id Not Exits'
                        })
                    })
            })

    }

}





// Get review by product id
get_reviewById = (req, res) => {
    knex('review')
        .innerJoin('customer', 'review.customer_id', 'customer.customer_id')
        .select('customer.name', 'review.review', 'review.rating',  'review.created_on')
        .where('product_id', req.params.product_id)
        .then((reviewData) => {
            console.log(reviewData)
            res.json({
                succes: true,
                message: 'Your Reviewed data',
                review_data: reviewData
            })
        }).catch((err) => {
            console.log(err)
            res.status(400).json({
                succes: false,
                message: 'Auth error'
            })
        })

}






module.exports = {
    get_product,
    get_product_byId,
    searchProduct,
    get_product_Join_Category,
    productDetails_byId,
    getLocations_join_ByproductId,
    get_productBydepartmentId,
    post_reviews,
    get_reviewById
}