import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();
const router = Router();
const compression = require("compression");
const parseString = require("xml2js").parseString;
const https = require("https");

api.use(express.urlencoded({ extended: false }));
api.use(compression());
api.use(express.json());

/////////////////////////////// Change URL Below

router.get("/xml", async (request, response) => {
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
        "https://freilichtbuehne-freudenberg-tickets.de/cbn/cbn.php?document=spielplxml&von=01.01.2025&bis=31.12.2025";
    xmlToJson(url, function (err, data) {
        // console.log(data.spielplan.vst);
        if (err) {
            return console.error(err);
        }

        response.json(data.spielplan);
    });
});

///////////////////////////////

// Export the handler function
api.use("/api/", router);
export const handler = serverless(api);
