const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// GET Route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// POST Route
app.post("/bmicalculator", function (req, res) {

    let name = req.body.name;
    let height = parseFloat(req.body.height);
    let weight = parseFloat(req.body.weight);

    let bmi = weight / (height * height);
    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    // Redirect back with result in URL
    res.redirect(`/?name=${name}&bmi=${bmi.toFixed(2)}&category=${category}`);
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});