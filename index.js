const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const { v4: uuidv4 } = require('uuid');
app.use('/static', express.static('./static'));

app.listen(3000, () => {
    console.log("It Works!");
});

app.get('/download', (req, res) => {
    var url = req.query.url;
    res.header("Content-Disposition", `attachment; filename="${uuidv4()}.mp4`);
    ytdl(url, {format: 'mp4'}).pipe(res);
});