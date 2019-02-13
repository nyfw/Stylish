const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { translate } = require("./controllers/translate");
const usersRouter = require("./routers/users");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRouter);

app.get("/", (req, res) => res.json("HI"));

app.get("/oauth", (req, res) => {
  const code = req.query.code;
  console.log("code", code);
  const clientID = "058be9921c3c4e64f5a351";
  const secret = "93fdfb2b80cbe84c047b6a20ac05eaced870e965";
  request.post(
    `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${secret}&code=${code}`,
    (err, response) => {
      const url = "https://api.github.com/user?" + response.body;
      const options = {
        url,
        headers: {
          "User-Agent": "request",
          Accept: "application/vnd.github.v3+json"
        }
      };

      request.get(options, (error, data) => {
        console.log("data", data);
        console.log("code", code);
      });
    }
  );
});

app.post("/translate", translate);

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
});
