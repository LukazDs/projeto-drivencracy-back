import { db, objectId } from "../dbStrategy/mongo.js";
import { choiceSchema } from "../schemas/choicesSchema.js";

export async function insertChoice(req, res) {

    const { title, poolId } = req.body;

    const validation = choiceSchema.validate(req.body)

    if (validation.error) {
        return res.sendStatus(422);
    }

    try {

        const pollsDb = await db.collection("polls")
            .findOne({ _id: new objectId(poolId) });

        if (!pollsDb) {
            res.sendStatus(404);
            return;
        }

        const choicesDb = await db.collection("choices")
            .findOne({ title });

        if (choicesDb) {
            res.sendStatus(409);
            return;
        }

        await db.collection("choices").insertOne({ title, poolId });

        res.status(201).send("Choice postada com sucesso");

    } catch (error) {
        res.sendStatus(500);
    }

}