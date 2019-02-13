const jwt = require("jsonwebtoken");
const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);
var bcrypt = require("bcryptjs");

async function serialize(user) {
  const saltRounds = 10;
  const hash = await bcrypt.hashSync(user.password, saltRounds);
  console.log("hashed password", hash);
  return {
    name: user.name,
    password: hash
  };
}

const signToken = email => {
  console.log("in sign in");
  const jwtPayload = { email };
  const SECRET = "fdsfsdfsd";
  return jwt.sign(jwtPayload, SECRET, { expiresIn: 60 * 60 });
};

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
};

// creating new session
const createSession = user => {
  console.log("in create session", user);
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(success => {
      console.log("success", success);
      return { success: true, userId: id, token, user };
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};

const createUser = async (req, res, db) => {
  try {
    const { name, email, password } = req.body;

    let user = {
      name,
      password
    };

    let hashed = serialize(user);
    let hashedpwd;
    hashed.then(hasheddata => {
      console.log("hashed data", hasheddata);
      hashedpwd = hasheddata.password;
    });

    const users = await db.transaction(trx =>
      trx
        .insert({
          name,
          email,
          password: hashedpwd
        })
        .into("users")
        .returning("*")
        .then(trx.commit)
        .catch(trx.rollback)
    );
    return res.json(users[0]);
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res, db) => {
  try {
    const { email, password } = req.body;
    console.log("req body", req.body);

    return await db.transaction(trx =>
      trx
        .select("email", "password")
        .from("users")
        .where("email", "=", email)
        .then(data => {
          console.log("loginuser", data);
          return bcrypt.compare(password, data[0].password).then(valid => {
            if (valid) {
              console.log("password matches");
              return db
                .select("*")
                .from("users")
                .where("email", "=", email)
                .then(user => user[0])
                .catch(err => res.status(400).json("cannot find user"));
            } else {
              return res.json("invalid password");
            }
          });
        })
    );
  } catch (err) {
    console.log(err);
  }
};

const getAuthTokenId = (req, res) => {
  console.log("in getAuth", req.headers);
  const { authorization } = req.headers;
  // if token was messed with - unauthorized
  return redisClient.get(authorization, (err, reply) => {
    console.log(reply);
    if (!reply) return res.status(401).send("Unauthorized");
    return res.json({ id: reply });
  });
};

const signInAuth = (req, res, db) => {
  const { authorization } = req.headers;

  if (authorization) {
    return getAuthTokenId(req, res);
  } else {
    return loginUser(req, res, db)
      .then(data => {
        console.log("loginUser called", data);
        return data.email ? createSession(data) : Promise.reject();
      })
      .then(session => {
        console.log("session", session);
        res.json(session);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = {
  createUser,
  loginUser,
  signInAuth,
  getAuthTokenId
};
