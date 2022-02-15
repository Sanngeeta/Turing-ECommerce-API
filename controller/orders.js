const knex = require('../model/database')


order = (req, res) => {
    knex('shopping_cart')
        .join('product', 'product.product_id', 'shopping_cart.product_id')
        .select('*').where('shopping_cart.cart_id', req.body.cart_id)
        .then((data) => {
            if(data.length===0){
                return res.send({message:'invalid cart id'})
            }
            sum = 0
            for (i of data) {
                sum += i.price * i.quantity
            }
            const order = {
                total_amount: sum,
                created_on: new Date(),
                shipped_on: new Date(),
                status: 1,
                customer_id: req.userData.customer_id,
                shipping_id: req.body.shipping_id,
                tax_id: req.body.tax_id,
            }
            console.log(order)
            knex('orders').insert(order)
                .then((insertdata) => {
                    for (i of data){
                        console.log(i)
                        const order_details = {
                            order_id: insertdata[0],
                            product_id: i.product_id,
                            attributes: i.attributes,
                            product_name: i.name,
                            quantity: i.quantity,
                            unit_cost: i.price
                        }
                        knex('order_detail').insert(order_details)
                            .then((orderDeatil) => {
                                console.log(orderDeatil)
                                // res.json({
                                //     orderId: insertdata,
                                //     order_details: orderDeatil
    
                                // })
    
    
                            }).catch((err) => {
                                res.send({ error: err })
                            })
                    }
                    knex.select("*").from('shopping_cart').where('cart_id', req.body.cart_id).del()
                    .then((deletedata)=>{
                        res.send({del_shoppingCart:`Cart Deleted ${deletedata}`})
                    }).catch((err)=>{
                        res.send({err:err})
                    })
                   
                }).catch((err) => {
                    console.log(err);
                    res.send({
                        error: err
                    })
                })
        }).catch((err) => {
            res.json({
                message: err
            })
        })
}




// Get order data by order id
getOrder_ById = (req, res) => {
    knex.select('*').from('order_detail').where('order_id ', req.params.order_id)
        .then((getOrder) => {
            for (i of getOrder) {
                i.subtotal = i.unit_cost * i.quantity
            }
            console.log(getOrder);
            res.json({
                sussec: true,
                message: 'Order by order_id ',
                orders: getOrder
            })
        }).catch((err) => {
            res.status(400).json({
                message: 'Order Id Invalid'
            })

        })
}



// [
//     {
//       "order_id": 45088,
//       "total_amount": "210.18",
//       "created_on": "2022-01-19T06:08:29.000Z",
//       "shipped_on": null,
//       "status": 0,
//       "name": "Pratik"
//     }
//   ]


// Get order by customer id
getOrder_customerId = (req, res) => {
    knex('orders')
        .join('customer', 'orders.customer_id', 'customer.customer_id')
        .select('orders.order_id','orders.total_amount','orders.created_on','orders.shipped_on','orders.status','customer.name').where('customer.customer_id', '=', req.userData.customer_id)
        .then((getByCustomer) => {
            console.log(req.userData.customer_id)
            res.json({
                succes: true,
                message: 'Order By Customercustomer Id',
                orderCustomer: getByCustomer
            })
        }).catch((err) => {
            console.log(err);
            res.json({
                message: 'data not found'
            })
        })

}




// Get Information about Order
getInfo_aboutOder = (req, res) => {
    knex.select('order_id', 'total_amount', 'created_on', 'shipped_on', 'status').from('orders').where('order_id', req.params.order_id)
    .then((info_order) => {
        res.json({
            message: 'Get info about Order',
            order: info_order
        })
    }).catch((err) => {
        console.log(err);
        res.json({
            message: 'Order not exits!'
        })
    })
}



module.exports = {
    order,
    getOrder_ById,
    getOrder_customerId,
    getInfo_aboutOder

}