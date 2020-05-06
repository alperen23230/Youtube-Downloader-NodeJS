const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());

app.use('/static', express.static('./static'));

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("It Works!");
});

app.get('/download', (req, res) => {
    var url = req.query.url;
    ytdl.getInfo(url, function(err, info){
        var videoName = info.title.replace('|','').toString('ascii');
        res.header("Content-Disposition", `attachment; filename="${videoName}.mp4`);
        ytdl(url, { format: 'mp4' }).pipe(res);
    });
});

app.get('/downloadmp3', (req, res) => {
    var url = req.query.url;
    ytdl.getInfo(url, function(err, info){
        var videoName = info.title.replace('|','').toString('ascii');
        res.header("Content-Disposition", `attachment; filename="${videoName}.mp3`);
        ytdl(url, { filter: 'audioonly' }).pipe(res);
    });
});