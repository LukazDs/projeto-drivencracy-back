import { db, objectId } from "../dbStrategy/mongo.js";
import { choiceSchema } from "../schemas/choicesSchema.js";

export async function insertChoice(req, res) {

    const { title, poolId } = req.body;

    const validation = choiceSchema.validate(req.body)

    if (validation.error) {
        return res.sendStatus(422);
    }

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