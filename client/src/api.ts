import serverless from "serverless-http";

import { Router } from "express";
const express = require("express");
const app = express();
const { Server } = require("http");
const server = Server(app);
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const parseString = require("xml2js").parseString;
const https = require("https");
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.json());

app.use(cors());
const router = Router();
/////////////////////////////// Change URL Below

app.get("/api/xml", async (request, response) => {
    console.log("hahahehe");
    function xmlToJson(url, callback) {
        var req = https.get(url, function (res) {
            var xml = "";

            res.on("data", function (chunk) {
                xml += chunk;
            });

            res.on("error", function (e) {
                callback(e, null);
            });

            res.on("timeout", function (e) {
                callback(e, null);
            });

            res.on("end", function () {
                parseString(xml, function (err, result) {
                    callback(null, result);
                });
            });
        });
    }

    // Change ending of url according to the date needed:
    var url =
        "https://freilichtbuehne-freudenberg-tickets.de/cbn/cbn.php?document=spielplxml&von=01.01.2023&bis=31.12.2023";
    xmlToJson(url, function (err, data) {
        console.log(data.spielplan.vst);
        if (err) {
            return console.error(err);
        }

        response.json(data.spielplan);
    });
});

///////////////////////////////
// this is it!

export const handler = serverless(app);

// or as a promise
