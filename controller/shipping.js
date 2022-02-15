const knex=require('../model/database')



// Get shipping data

get_shipping=(req,res)=>{
    knex.select('*').from('shipping')
    .then((getShipping)=>{
        res.json({
            succes:true,
            message:'Get Shipping Region',
            shipping_region:getShipping
        })
    }).catch((err)=>{
        console.log(err)
        res.json({
            succes:false,
            message:'Data Not Found'
        })
    })
}





get_shippingById=(req,res)=>{
    knex.select('*').from('shipping').where('shipping_region_id',req.params.shipping_region_id)
    .then((shippingData)=>{
        if(shippingData.length===0){
            res.send({message:'shipping_region not found'})
        }else{
            res.json({
                succes:true,
                message:'Get Shipping Region By shipping_region_id ',
                shipping_region:shippingData
            })
            
        }
        
    }).catch((err)=>{
        res.json({
            succes:false,
            message:'shipping_region_id not exits'
        })
    })
}












module.exports={get_shipping,get_shippingById}