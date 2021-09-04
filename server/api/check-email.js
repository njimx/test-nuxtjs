const fs = require("fs");

export default async (req, res) => {
  let email = "";
  let obj = null;
  req.once("data", data => {
    const item = JSON.parse(data.toString());
    email = item.email;
    const content = fs.readFileSync(
      __dirname + "/../../content/users.json",
      "utf8"
    );
    const users = JSON.parse(content);
    const userData = users.data;
    obj = userData.filter(item => item.email == email);
    if (obj != null) {
      res.end(JSON.stringify({ success: false }));
    }
  });
  res.end(JSON.stringify({ success: true }));
};
