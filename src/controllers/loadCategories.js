const categories = [
    { name: 'Unit', variants: ["Stealth", "Tank"] },
    { name: 'Device', variants: ["Trap", "Weapon"] }
];

const { Category } = require('../db');

const createCategory = async (category) => {
    try {
        const createdCategory = await Category.create({
            name: category.name
        });
        return createdCategory; // Return the created category
    } catch (error) {
        console.error(`Error creating category ${category.name}:`, error);
        throw error; // Re-throw the error to be caught in the calling function
    }
};

const getCategories = async (req, res) => {
    try {
        const creationPromises = categories.map(category => createCategory(category));
        const DBCategories = await Promise.all(creationPromises);
        res.status(200).json(DBCategories);
    } catch (error) {
        console.error('Error creating categories:', error);
        res.status(500).json('Error creating categories.');
    }
};

module.exports = {
    getCategories
};
