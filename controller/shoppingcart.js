const generateUniqueId = require('generate-unique-id');
const knex = require('../model/database')
    // const id = generateUniqueId(req.body.cart_id)



// Generate Unique ID
get_generateUniqueId = (req, res) => {
    knex.select('*').from('shopping_cart')
        .then((cartUnique) => {
            cartUnique = generateUniqueId({
                excludeSymbols: ['@', '#', '|']
            });
            res.send({
                message: 'Get Unique Id',
                cart_id: cartUnique
            })
        }).catch((err) => {
            res.send({
                message: 'Something went wrong'
            })
        })

}



// Add a product in the card
product_addCart_post = (req, res) => {
    const addProductCar = {
        cart_id: req.body.cart_id,
        product_id: req.body.product_id,
        attributes: req.body.attributes,
        quantity: 1,
        added_on: new Date()



    }
    console.log(addProductCar);
    knex('shopping_cart').insert(addProductCar)
        .join('product', 'shopping_cart.product_id', 'product.product_id')
        .then((addCartProduct) => {
            knex.select('*').from('shopping_cart').where('item_id', addCartProduct)
                .then((postData) => {
                    res.json({
                        succes: true,
                        message: 'Add a Product in the cart succesfully!',
                        AddCart: postData
                    })
                }).catch((err) => {
                    res.send({
                        error: err
                    })
                })

        }).catch((err) => {
            console.log(err)
            res.json({
                error: 'addCard failed'
            })
        })


}



// get All shoppig cart data 
get_shopping = (req, res) => {
    knex('shopping_cart')
        .select('*')
        .then((data) => {
            res.json({
                message: 'Products in shopping cart',
                data: data
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                error: 'Inavlid cart id'
            })
        })
}


// Get List of Products in Shopping Cart
get_shoppingBycart_id = (req, res) => {
    knex('shopping_cart')
        .join('product', 'shopping_cart.product_id', 'product.product_id')
        .select({
            "item_id": "shopping_cart.item_id",
            "name": "product.name",
            "attributes": "shopping_cart.attributes",
            "product_id": "shopping_cart.product_id",
            "price": "product.price",
            "quantity": "shopping_cart.quantity",
            "image": "product.image"
        }).where('cart_id', req.params.cart_id) //cart id lagne pr data is not comming
        .then((data) => {
            console.log(data,req.params.cart_id);
            for (i of data) {
                i.subtotal = i.price * i.quantity
            }
            res.json({
                message: 'Products in by shopping cart',
                data: data
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                error: 'Inavlid cart id'
            })
        })
}





// Update the cart by item
updateCartByItem = (req, res) => {
    knex('shopping_cart').where('item_id', req.params.item_id).update({
            quantity: req.body.quantity
        })
        .then((data) => {
            knex.select('*').from('shopping_cart').where('item_id', req.params.item_id)
                .then((quantity) => {
                    if (quantity.length === 0) {
                        res.send({
                            message: 'You dont have item'
                        })
                    } else {
                        res.json({
                            succes: true,
                            message: 'Update the cart by item',
                            UpdateCart_byItem: quantity
                        })
                    }
                }).catch((err) => {
                    res.json({
                        message: 'Update the cart by item failed'
                    })
                })
        }).catch((err) => {
            res.json({
                message: 'Not Found Item Id'
            })
        })

}



// Delete (Empaty cart)
Empty_cart = (req, res) => {
    knex.delete('*').from('shopping_cart').where('cart_id', '=', req.params.cart_id)
        .then((data) => {
            console.log('data',
                data)
            knex.select('*').from('shopping_cart').where('item_id', data)
                .then((EmptyCart) => {
                    console.log(EmptyCart)
                    res.json({
                        Empty_cart: `Deleted sueccesfully`,

                    })

                }).catch((err) => {
                    res.json({
                        message: 'Invaild Cart Id'
                    })
                })
        }).catch((err) => {
            res.json({
                error: err
            })
        })

}


// abhi ye hua nhi hai ese pura karna hai
// Return a total Amount from Cart
Get_totalAmount_byCart = (req, res) => {
    knex('shopping_cart')
        .join('product', 'shopping_cart.product_id', 'product.product_id')
        .select('*').where('cart_id', req.params.cart_id)
        .then((data) => {
            sum = 0
            for (i of data) {
                sum += i.price * i.quantity
            }
            res.send({
                Total_Amount: sum
            })

        }).catch((err) => {
            console.log(err)
        })

}




//Remove the product in the cart
remove_product_IntheCart = (req, res) => {
    knex.delete('*').from('shopping_cart').where('item_id', '=', req.params.item_id)
        .then((data) => {
            knex.select('*').from('shopping_cart').where('item_id', data)
                .then((deleteProduct) => {
                    console.log(deleteProduct);
                    res.json({
                        del_product: 'Product Deteled By Item Id Succesfully',
                    })

                }).catch((err) => {
                    res.json({
                        message: err
                    })
                })
        }).catch((err) => {
            res.json({
                message: err
            })
        })
}







module.exports = {
    get_generateUniqueId,
    product_addCart_post,
    get_shoppingBycart_id,
    updateCartByItem,
    Empty_cart,
    get_shopping,
    Get_totalAmount_byCart,
    remove_product_IntheCart
}