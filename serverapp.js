import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // console.log("<h1>Hello</h1>");
    res.send("<h1>Hello</h1>");
});

app.get("/about", (req, res) => {
    // console.log("<h1>Hello</h1>");
    res.send("<h1>This is About</h1>");
});

app.get("/contact", (req, res) => {
    // console.log("<h1>Hello</h1>");
    res.send("<h1>This is Contact</h1>");
});

app.listen(port, () => {
    console.log(`Listening to port : ${port}`);
})