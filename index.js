import express from "express";
import { Server } from "http";
import serverless from "serverless-http";
import { parseString } from "xml2js";
import https from "https";

const app = express();
const server = Server(app);

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.json());

// Define router
const router = express.Router();

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
        "https://freilichtbuehne-freudenberg-tickets.de/cbn/cbn.php?document=spielplxml&von=01.01.2024&bis=31.12.2024";
    xmlToJson(url, function (err, data) {
        console.log(data.spielplan.vst);
        if (err) {
            return console.err(err);
        }

        response.json(data.spielplan);
    });
});

// Use the router
app.use("/api", router);

export const handler = serverless(app);
