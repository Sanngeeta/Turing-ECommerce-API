const knex = require('../model/database')


get_attributes = (req, res) => {
    knex.select('*').from('attribute')
        .then((getAtt) => {
            res.json({
                succes: true,
                status: 200,
                message: 'Get Attributes Data',
                all_attributes: getAtt
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




get_attributesById = (req, res) => {
    knex.select('*').from('attribute').where('attribute_id', req.params.attribute_id)
        .then((GetattId) => {
            res.json({
                succes: true,
                status: 201,
                message: 'Get Data By Attributes Id',
                all_attributes: GetattId
            })
        }).catch((err) => {
            res.send({
                succes: false,
                status: 400,
                message: 'Error data not found'
            })
        })
}

Join_att_attValue = (req, res) => {
    knex('attribute')
        .innerJoin('attribute_value', 'attribute_value.attribute_id', 'attribute.attribute_id')
        .select('*').where('attribute_value.attribute_id', req.params.attribute_id)
        .then((attValue) => {
            res.json({
                succes: true,
                status: 200,
                message: 'Get data succesfully by attribute value',
                data: attValue
            })
        }).catch((err) => {
            console.log(err)
            res.send({
                succes: false,
                status: 403,
                message: 'Error data not found'
            })
        })


}





Join_attribute_attribute_Value = (req, res) => {
    knex('attribute')
        .join('attribute_value', 'attribute_value.attribute_id', 'attribute.attribute_id')
        .join('product_attribute', 'product_attribute.attribute_value_id', 'attribute_value.attribute_value_id')
        .select({
            'attribute': 'attribute.name',
            'attribute_value_id': 'attribute_value.attribute_value_id',
            'attribute_value': 'attribute_value.value'
        }).where('product_attribute.product_id', req.params.product_id)
        .then((data) => {
            if (data.length === 0) {
                res.send({ message: 'attribute_data not exits' })
            } else {
                res.json({
                    succes: true,
                    status: 201,
                    message: 'all data by product id',
                    data: data
                })
            }
        }).catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 406,
                message: 'error something is wrong'
            })
        })
}






















module.exports = { get_attributes, get_attributesById, Join_att_attValue, Join_attribute_attribute_Value }