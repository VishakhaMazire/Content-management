const express = require("express");
const app = express();
const port = process.env.PORT || 6000;
const posterController = require("./routes/poster");
const multer = require('multer')

app.use(express.json());

app.use(express.static(`${__dirname}/client/build`));
app.use('/uploads', express.static('uploads'));

const { connectDB } = require("./config/db");
connectDB();


app.post("/", (req, res) => {
    console.log('ok');
});

const storage = multer.diskStorage(
    {
        destination: 'uploads/',
        filename: function (req, file, cb) {

            cb(null, file.originalname + '-' + ".png");
        }
    }
);


const upload = multer({ storage: storage });

const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }]);

app.post("/savePoster", cpUpload, posterController.savePoster.post);

app.post("/getList", posterController.getList.post);

app.post("/editPoster/:id", cpUpload, posterController.editPoster.post);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;