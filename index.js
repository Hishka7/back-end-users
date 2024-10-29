// ADD-FILE
// const fs = require("fs");
// fs.appendFile("text.txt", "hello", (error) => {
//   if (error) console.log(error);
//   console.log(" done!! ");
// });
// DELETE
// const fs = require("fs");
// fs.unlink("text.txt", (error, data) => {
//   if (error) console.log(error);
//   console.log(" deleted!! ");
// });
// READ-FILE
// const fs = require("fs");
// fs.readFile("text.txt", "utf8", (error, data) => {
//   console.log(data);
// });
// HTTP
const http = require("http");
const fs = require("fs");
let data;
const jsonData = fs.readFileSync("data.json");
data = JSON.parse(jsonData);

const service = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;
  response.setHeader("Content-Type", "application/json");
  if (url.startsWith("/users?id=")) {
    const id = url.split("=")[1];
    const user = data.find((user) => user.id === Number(id));
    if (user) {
      response.write(JSON.stringify(user));
    } else {
      response.write(
        JSON.stringify({
          message: "NOT FOUND!!!!",
        })
      );
    }
  } else if (url.startsWith("/users")) {
    response.write(JSON.stringify(data));
  } else {
    response.write(
      JSON.stringify({
        message: "NOT FOUND!!!!",
      })
    );
  }

  if (method === "POST") {
    let body = "";
    request.on("data", (buffer) => {
      body += buffer;
    });
    request.on("end", () => {
      const parsed = JSON.parse(body);

      const newUser = {
        id: data.length + 1,
        ...parsed,
      };
      data.push(newUser);
      fs.writeFile("data.json", JSON.stringify(data), (err) => {
        console.log(err);
      });
    });
    response.write(
      JSON.stringify({
        message: "done!!",
      })
    );
  }
  if (method === "DELETE") {
    let body = "";
    request.on("data", (buffer) => {
      body += buffer;
    });
    request.on("end", () => {
      const parsed = JSON.parse(body);
      data.push(newUser);
      fs.writeFile("data.json", JSON.stringify(data), (err) => {
        console.log(err);
      });
    });
    data.find((user) => user.id === body.id);
    fs.unlink("data.json", (error) => {
      console.log(error);
    });
    response.write(
      JSON.stringify({
        message: "deleted!!",
      })
    );



  }
  response.end();
});
service.listen(8080, console.log("http://localhost:8080"));
