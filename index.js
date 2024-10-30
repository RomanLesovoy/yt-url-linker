const express = require("express");
const youtubedl = require('youtube-dl-exec')
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(
        `Ping at: ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
    );
    res.sendStatus(200);
});

app.get("/download", async (req, res) => {
    const { url } = req.query;

    if (url) {
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        })

        return res.status(200).send(output);

    } else {
        res.status(400).send("Invalid query");
    }
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
