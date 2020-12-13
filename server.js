const express = require("express");
const path = require("path")
const app = express();
// if (process.env.NODE_ENV=== "production") {
  app.use("/", express.static(path.join(__dirname, "build")))
  app.get("*", (req, res)=> {
    res.sendFile(path.resolve(__dirname, "build", "index.html"))
  })
// }

const PORT = process.env.PORT || 5000;

async function start() {
  try {
       app.listen(PORT, () => {
      console.log("app started on port"+ PORT);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

start();
