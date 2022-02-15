const knex=require('../model/database')


get_tax=(req,res)=>{
    knex('*').from('tax')
    .then((data)=>{
        res.json({
            succes:true,
            status:201,
            message:'all data by product id',
            data:data
        })
    }).catch((err)=>{
        console.log(err)
        res.json({
            succes:false,
            status:406,
            message:'error something is wrong',
        })
    })
}



getTexBy_tax_id=(req,res)=>{
    knex('*').from('tax').where('tax_id',req.params.tax_id)
    .then((dataTaxId)=>{
        res.json({
            succes:true,
            status:200,
            message:'data get by id succesfully',
            data:dataTaxId
        })
    }).catch((err)=>{
        console.log(err)
        res.json({
            succes:false,
            status:400,
            message:'error something is wrong',
        })
    })

}


module.exports={get_tax, getTexBy_tax_id}