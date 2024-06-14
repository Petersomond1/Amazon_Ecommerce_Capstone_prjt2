export const addRowsIds = async (req, res) => {
    const rows = req.body;


    const updateQuery = "UPDATE idstofeature SET numbers = ? WHERE id = ?;";
    for (let i = 0; i < rows.length; i++) {
        const id = i+1; 
        const numbers = rows[i];

        await db.query(updateQuery, [numbers, id]);
        console.log("query:", i, "was done for id:", id);
    }

    res.status(200).json({ message: "Data updated" });
}
