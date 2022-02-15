const knex = require('../model/database')

get_deparments =  (req, res) => {
    knex.select('*').from('department')
        .then((getdepart) => {
            console.log(getdepart);
            // res.send(getdepart)
            res.json({
                succes: true,
                status: 200,
                message: 'derpatmets datas',
                All_deparments: getdepart
            })
        }).catch((err) => {
            console.log(err)
           return res.json({
                succes: false,
                status: 400,
                message: 'Derpartment data not found',
            })

        })

}






get_deparments_byId = (req, res) => {
    knex.select('*').from('department').where('department_id', '=', req.params.department_id)
        .then((getdepart) => {
            res.json({
                succes: true,
                status: 200,
                message: 'Derpatmets By Id',
                All_deparments: getdepart
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 400,
                message: 'Derpartment By Id data not found',
            
            })

        })

}






module.exports = {
    get_deparments,
    get_deparments_byId
}