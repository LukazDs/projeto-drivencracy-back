import { db, objectId } from '../dbStrategy/mongo.js';

async function validateVote(req, res, next) {

  const { id } = req.params;

  const choiceDb = await db.collection("choices")
    .findOne({ _id: new objectId(id) });

  if (!choiceDb) {
    res.sendStatus(404);
    return;
  }
  
  res.locals.choiceDb = choiceDb;

  next();
}

export default validateVote;