import { response } from 'express'
import warningService from '../services/warningService'

let createWarning = async (req, res) => {
    try {
        let idUser = req.body.id
        console.log('in controller warning and id ', idUser)
        if (!idUser) {
            res.status(200).json({
                errCode: 1,
                message: 'Missing parameter'
            })
        }

        let message = await warningService.createWarning(idUser)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}


let getWarningByTime = (req,response) =>{
    
    // const idUser = req.session.idUser || req.body.idUser
    const idUser = req.session.idUser
    const day = req.query.day
    const month = req.query.month
    const year = req.query.year

    warningService.getWarningByTime({idUser, day, month, year}) 
        .then( data=>{
            data.map((item) =>{
                const date = new Date(String(item.createdAt));
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                item.createdAt = formattedDate
                item.year = year
                item.month = month
                item.day = day
                item.hours = hours
                item.minutes = minutes
                item.seconds = seconds

            })
            response.status(200).json({result: true, data: data})
        })
        .catch(err=>{
            console.log(err)
            response.status(500).json({result: false, message: 'server is error' , data:[]})
        })
}



export default {
    getWarningByTime,
    createWarning: createWarning
}