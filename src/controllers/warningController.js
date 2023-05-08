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

export default {
    createWarning: createWarning
}