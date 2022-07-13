import { db } from "../dbStrategy/mongo.js";

export async function insertChoice(req, res) {
    const { title, poolId } = req.body;

    try {
        
        await db.collection("choices").insertOne({ title, poolId })

        res.status(201).send("Choice postada com sucesso")

    } catch(error) {
        res.sendStatus(500)
    }

}