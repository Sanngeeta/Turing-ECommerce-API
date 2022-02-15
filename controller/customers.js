const knex=require('../model/database')
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')

// Register a customer
registerCustomer=(req,res)=>{
    if(!req.body.name || !req.body.email || !req.body.password){
        res.json({
            succes:false,
            status:406,
            message:'Failed All filed Required'
        })
    }else{
            const users={
                name:req.body.name,
                email:req.body.email,
                password:req.body.password}
                knex('customer').insert(users)
                .then((data)=>{
                    knex.select('*').from('customer').where('customer_id ',data)
                    .then((insertdata)=>{
                        res.json({
                            succes:true,
                            status:200,
                            message:'You are register sussesfully',
                            users:insertdata})
                    }).catch((err)=>{
                        res.send({
                            error: 'Invalid details!'})
                    })
                            
                }).catch((err)=>{
                    console.log(err)
                    res.json({
                        succes:false,
                        status:400,
                        message:'Email id already exits',
                    })
                })
            }
}




// Login custmoers by email and password
customersLogin=(req,res)=>{
    if(!req.body.email || !req.body.password){
        res.status(401).json({
            succes: false,
            message: 'Failed Required Both Fild'})
    }else{
        knex.select('*').from('customer').where('email','=',req.body.email,'password','=',req.body.password)
        .then((data)=>{
            if(data.length<1){
                res.status(400).json({
                    message:'Email Faild'
                })
            }else{
                var token = jwt.sign({customer_id: data[0].customer_id}, 'sangeetapaswan', {expiresIn: '6h'})
                res.cookie("user ",token)
                res.json({
                    succes:true,
                    status:200,
                    message:'You are login sussesfully',
                    users:data,
                    token:token})
            }      
    
        }).catch((err)=>{
            res.json({
                succes:false,
                status:400,
                message:'Auth error',
            })
    
        })

    }
   
}







// Get users details by customers id

getCustomersById=(req,res)=>{
    knex.select('*').from('customer').where('customer_id',req.params.customer_id)
    .then((getdata)=>{
        console.log(getdata)
        res.json({
            succes:true,
            status:200,
            message:'Customer Details by customer id',
            users:getdata,
            })

    }).catch((err)=>{
        console.log(err)
        res.json({
            succes:false,
            status:400,
            message:'Invalid Id'
        })
    })
}





// Update customer profile
updateCustomer=(req,res)=>{
    knex('customer').where("customer_id","=",req.params.customer_id).update({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        day_phone:req.body.day_phone,
        eve_phone:req.body.eve_phone,
        mob_phone:req.body.mob_phone

    })
    // knex.select('*').from('customer')
    .then((updatedData)=>{
        knex.select('*').from('customer').where('customer_id',updatedData)
            .then((updateCustomer)=>{
                console.log(updateCustomer)
                res.json({
                    succes:true,
                    status:200,
                    message:'Your are updated succesfully',
                    updated_data:updateCustomer
                })

            }).catch((err)=>{
                res.send({message:'Auth error'})
            })
        
    }).catch((err)=>{
        console.log(err)
        res.json({
            succes:false,
            status:400,
            message:'Updated Faild '
        })

    })
    
}



// Update address
updateAddress=(req,res)=>{
    knex.from('customer').where('customer_id',req.params.customer_id).update({
        address_1:req.body.address_1,
        address_2:req.body.address_2,
        city:req.body.city,
        region:req.body.region,
        postal_code:req.body.postal_code,
        country:req.body.country,
        shipping_region_id:req.body.shipping_region_id
    }).then((data)=>{
        knex.select('*').from('customer').where('customer_id',data)
            .then((update)=>{
                if(update.length===0){
                    res.json({message:'User not exit'})
                }else{
                    res.json({
                        succes:true,
                        status:200,
                        message:'Address Updated Succesfully!',
                        Updated_Address:update
                    })
                    
                }
                
            }).catch((err)=>{
                console.log(err)
                res.json({
                    succes:false,
                    status:400,
                    message:'Something Went Wrong'
                })

    }).catch((err)=>{
        res.status(406).json({
            message:'User not exit!'
        })
    })
       
})


}




// Update credit card
updateCredit_card=(req,res)=>{
    knex('customer').where('customer_id',req.params.customer_id)
    .update({
        credit_card:req.body.credit_card
    }).then((data)=>{
        knex.select('*').from('customer').where('customer_id',data)
        .then((card)=>{
            if(card.length===0){
                res.send({message:'User Not Exits!'})
            }else{
                res.json({
                    succes:true,
                    status:200,
                    message:'Credit Card Updated',
                    credit_card:card
                })

            }           

        }).catch((err)=>{
            res.send({message:'Card not found'})
        })
        
        
    }).catch((err)=>{
        res.json({
            succes:false,
            status:400,
            message:'Credit card not updated try again'
        })

    })



}









module.exports={
    registerCustomer,
    customersLogin,
    getCustomersById,
    updateCustomer,
    updateAddress,
    updateCredit_card
}