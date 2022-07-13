import { db, objectId } from "../dbStrategy/mongo.js";
import { choiceSchema } from "../schemas/choicesSchema.js";
import dayjs from "dayjs";

export async function insertChoice(req, res) {

    const { title, poolId } = req.body;

    const validation = choiceSchema.validate(req.body)

    if (validation.error) {
        return res.sendStatus(422);
    }

    try {

        const pollDb = await db.collection("polls")
            .findOne({ _id: new objectId(poolId) });

        if (!pollDb) {
            res.sendStatus(404);
            return;
        }

        const choicesDb = await db.collection("choices")
            .findOne({ title });

        if (choicesDb) {
            res.sendStatus(409);
            return;
        }

        const date1 = new Date(dayjs().format('YYYY-MM-DD hh:mm'));
        const date2 = new Date(pollDb.expireAt);

        if (date1 > date2) {
            res.sendStatus(403)
            return;
        }

        await db.collection("choices").insertOne({ title, poolId });

        res.status(201).send("Choice postada com sucesso");

    } catch (error) {
        res.sendStatus(500);
    }

}