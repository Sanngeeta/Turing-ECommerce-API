const express = require('express')
const chackAuth = require('../middlware/auth')

const { get_attributes, get_attributesById, Join_att_attValue, Join_attribute_attribute_Value } = require('../controller/attributes')
const router = express.Router()
const { Get_categories, Get_categories_byId, Get_join_category_product, Get_join_category_department } = require('../controller/categories')
const { registerCustomer, customersLogin, getCustomersById, updateCustomer, updateAddress, updateCredit_card } = require('../controller/customers')
const { get_deparments_byId, get_deparments } = require('../controller/departments')
const { get_product, get_product_byId, get_product_Join_Category, productDetails_byId, getLocations_join_ByproductId, get_productBydepartmentId, post_reviews, get_reviewById, searchProduct } = require('../controller/product')
const { get_tax, getTexBy_tax_id } = require('../controller/tax')
const { postOrders, getOrder_ById, getOrder_customerId, getInfo_aboutOder, orderData } = require('../controller/orders')
const { get_shipping, get_shippingById } = require('../controller/shipping')
const { get_generateUniqueId, product_addCart_post, updateCartByItem, Empty_cart, get_shoppingBycart_id, get_shopping, Get_totalAmount_byCart, remove_product_IntheCart } = require('../controller/shoppingcart')

// Category data
router.get('/categories', Get_categories)
router.get('/categories/:category_id', Get_categories_byId)
router.get('/categories/inProduct/:product_id', Get_join_category_product)
router.get('/categories/inDdepartment/:department_id', Get_join_category_department)


// Departmets data
router.get('/departmets', get_deparments)
router.get('/departments/:department_id', get_deparments_byId)


// Attributes data
router.get('/attributes', get_attributes)
router.get('/attributes/:attribute_id', get_attributesById)
router.get('/attributes/values/:attribute_id', Join_att_attValue)
router.get('/attributes/Inproduct/:product_id', Join_attribute_attribute_Value)




// Product data
router.get('/products', get_product)
router.get('/products/search', searchProduct)
router.get('/products/:product_id', get_product_byId)
router.get('/products/inCategory/:category_id', get_product_Join_Category)
router.get('/products/details/:product_id', productDetails_byId)
router.get('/products/locations/:product_id', getLocations_join_ByproductId)
router.get('/products/inDeparment/:department_id', get_productBydepartmentId)
router.post('/products/review', chackAuth, post_reviews)
router.get('/products/review/:product_id', get_reviewById)



// Tax data
router.get('/taxs', get_tax)
router.get('/taxs/:tax_id', getTexBy_tax_id)


// Customers data
router.post('/customers', registerCustomer)
router.post('/customers/login', customersLogin)
router.get('/customers/:customer_id', chackAuth, getCustomersById)
router.put('/customers/:customer_id', chackAuth, updateCustomer)
router.put('/customers/address/:customer_id', chackAuth, updateAddress)
router.put('/customers/creditCard/:customer_id', chackAuth, updateCredit_card)



// Orders APIs
router.post('/orders', chackAuth, order)
router.get('/orders/inCustomer', chackAuth, getOrder_customerId)
router.get('/orders/:order_id', chackAuth, getOrder_ById)
router.get('/orders/shortDetail/:order_id', chackAuth, getInfo_aboutOder)




// shipping_region APIs
router.get('/shipping/regions', get_shipping)
router.get('/shipping/regions/:shipping_region_id', get_shippingById)




// Sopping_card APIs
router.get('/shoppingcart/generateUniqueId', get_generateUniqueId)
router.post('/shoppingcart/add', product_addCart_post)
router.get('/shoppingcart/:cart_id', get_shoppingBycart_id)
router.get('/shoppingcart', get_shopping)
router.put('/shoppingcart/update/:item_id', updateCartByItem)
router.delete('/shoppingcart/empty/:cart_id', Empty_cart)
router.get('/shoppingcart/totalAmount/:cart_id', Get_totalAmount_byCart)
router.delete('/shoppingcart/removeProduct/:item_id', remove_product_IntheCart)









module.exports = { router }