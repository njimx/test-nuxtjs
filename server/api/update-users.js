const fs = require("fs");

export default async (req, res) => {
  let post = "";
  req.on("data", data => {
    post += data.toString();
  });
  req.on("end", () => {
    fs.writeFile(__dirname + "/../../content/users.json", post, "utf8", () => {
      res.end(JSON.stringify({ success: true }));
    });
  });
};
