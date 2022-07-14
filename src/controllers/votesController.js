import { db, objectId } from "../dbStrategy/mongo.js";
import dayjs from "dayjs";

export async function insertVote(req, res) {

    const { id } = req.params;

    try {

        const choiceDb = await db.collection("choices")
            .findOne({ _id: new objectId(id) });

        if (!choiceDb) {
            res.sendStatus(404);
            return;
        }

        await db.collection("votes")
            .insertOne({
                choiceId: id,
                createdAt: dayjs().format("YYYY-MM-DD hh:mm")
            });
        
        const pollDb = await db.collection("polls")
            .findOne({ _id: new objectId(choiceDb.poolId) });

        const date1 = new Date(dayjs().format('YYYY-MM-DD hh:mm'));
        const date2 = new Date(pollDb.expireAt);

        if (date1 > date2) {
            res.sendStatus(403);
            return;
        }

        res.status(201).send("Voto registrado com sucesso");

    } catch (error) {
        res.sendStatus(500);
    }

}
