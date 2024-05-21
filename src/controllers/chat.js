
const messages = []

const chat = async(req, res) => {

    const {message} = req.body

    messages.push(message)

    if(message.length > 0) {
        res.status(200).json(messages)
    }
}

module.exports = chat