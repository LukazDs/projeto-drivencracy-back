import { db } from '../dbStrategy/mongo.js';

async function validateChoice(req, res, next) {
    const { authorization } = req.headers;

    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
        return res.status(401).send("Usuário não encontrado!");
    }

  res.locals.session = session;
  console.log(session)

  next();
}

export default validateChoice;