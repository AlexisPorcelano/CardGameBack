const Types = require('../db.js')

const Categories = {
    UnitTypes: ["Stealth", "Tank"],
    DeviceTypes: ["Trap", "Weapon"],
}

const getTypes = async (req, res) => {
    try {
        const { category } = req.params

        const types = Categories.UnitTypes.map(e => {return e})

        console.log(types);

    } catch (error) {

    }
}