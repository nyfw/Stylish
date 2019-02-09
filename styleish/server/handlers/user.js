const createUser = async (req, res, db) => {
  try {
    const { name, email, password } = req.body;

    const users = await db.transaction(trx =>
      trx
        .insert({
          name,
          email,
          password
        })
        .into('users')
        .returning('*')
        .then(trx.commit)
        .catch(trx.rollback)
    );
    return res.json(users[0]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser
};
