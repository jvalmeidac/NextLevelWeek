const express = require("express");
const server = express();

const multer = require("./services/multer");
const db = require("./database/db");

//Configure Public
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

//Template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//Routes Config

//Page Home
server.get("/", (req, res) => {
  return res.render("index.html");
});

//Page Create Point
server.get("/createpoint", (req, res) => {
  return res.render("create-point.html");
});

//Page Create Point Post
server.post("/createpoint", multer.single("image"), (req, res) => {
  const query = `
   INSERT INTO places (
       name,
       image,
       address,
       number,
       complement,
       district,
       state,
       city,
       items
   ) VALUES (?,?,?,?,?,?,?,?,?);
 `;
  const values = [
    req.body.name,
    req.file.filename,
    req.body.address,
    req.body.number,
    req.body.complement,
    req.body.district,
    req.body.state,
    req.body.city,
    req.body.items
  ];
  db.run(query, values, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Cadastrado com sucesso!");
    console.log(this);
    res.render("create-point.html", {saved:true});
  });
});

server.get("/search", (req, res) => {
  const search = req.query.search;

  if(search == ""){
    return res.render("search.html", { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' collate utf8_general_ci`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length;
    return res.render("search.html", { places: rows, total });
  });
});

//Turn on server
server.listen(3000);
