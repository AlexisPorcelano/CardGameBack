const { Types, Category } = require('../db.js')

const types = [
    { name: "Stealth", category: "Unit" },
    { name: "Tank", category: "Unit" },
    { name: "Trap", category: "Device" },
    { name: "Weapon", category: "Device" }
];

const createTypes = async (type) => {
    try {
        const relatedCategory = await Category.findOne({ where: { name: type.category } });

        if (!relatedCategory) {
            throw new Error(`Category ${type.category} not found`);
        } else {

            const createdType = await Types.create({
                name: type.name,
            });

            createdType.addCategory(relatedCategory)

            return createdType;
        }
    } catch (error) {
        console.error(`Error creating type ${type.name}:`, error);
        throw error;
    }
}

const getTypes = async (req, res) => {
    try {

        const creationPromises = types.map(type => createTypes(type));
        const DBtypes = await Promise.all(creationPromises);

        res.status(200).json(DBtypes);
    } catch (error) {
        console.error('Error creating types:', error);
        res.status(500).json('Error creating types.');
    }
}

module.exports = getTypes;
