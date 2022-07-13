import { db, objectId } from "../dbStrategy/mongo.js";

export async function insertChoice(req, res) {

    const { title, poolId } = req.body;

    try {

        const choiceDb = await db.collection("polls")
            .findOne({_id: new objectId(poolId) });

        if (!choiceDb) {
            res.sendStatus(404);
            return;
        }

        await db.collection("choices").insertOne({ title, poolId });

        res.status(201).send("Choice postada com sucesso");

    } catch (error) {
        res.sendStatus(500);
    }

}