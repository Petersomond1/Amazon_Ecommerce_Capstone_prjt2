import db from "../config/db.js";

export const addRowsIds = async (req, res) => {
    const rows = req.body; // Assuming 'rows' is an array of strings as you mentioned
    if (!rows || !Array.isArray(rows)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const updateQuery = "UPDATE idstofeature SET row_ids = ? WHERE id = ?";

    try {
        await Promise.all(rows.map(async (numbers, index) => {
            const id = index + 1; // Assuming idstofeature table IDs start from 1 and increment

            // Convert numbers string to array of integers
            const numbersArray = numbers.split(',').map(numStr => parseInt(numStr.trim()));

            // Execute the update query
            await db.query(updateQuery, [JSON.stringify(numbersArray), id]);
            // console.log(`Updated row with id from controllers/users: ${id}`);
        }));

        res.status(200).json({ message: "Data updated" });
    } catch (error) {
        console.error("Error updating rows:", error);
        res.status(500).json({ error: "Failed to update rows" });
    }
};
