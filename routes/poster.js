const PosterModel = require("../models/poster");
module.exports = {
    getList: {

        post: async function (req, res, next) {


            const query = PosterModel.find({});
            const records = await query.exec();


            res.json({ 'data': records, 'status': 'ok' });



        }
    },
    savePoster: {
        post: async function (req, res, next) {

            let title = req.body.title;
            let desc = req.body.desc;

            let fName = req.files['file'][0].filename;



            if (title == undefined || desc == undefined) {

                res.json({ 'status': 'failed', 'response': "Invalid Request" });
                return;
            }

            if (title == '' || desc == '') {

                res.json({ 'status': 'failed', 'response': "Field are required" });
                return;
            }


            const poster = new PosterModel(
                {
                    "title": title,
                    "image": fName,
                    "desc": desc,

                }
            );



            poster.save().then((result) => {
                // res.send(result);
                res.json({ 'status': 'success', 'response': "Successfully saved" });

            }).catch((err) => {
                console.log(err),
                    res.json({ 'status': 'failed', 'response': "Unable to save" })
            });
        }
    },
    
    editPoster:{
        post: async function (req, res, next) {
            let title = req.body.title;
            let desc = req.body.desc;

            let fName = req.files['file'][0].filename;
            
            const id = req.params.id;


            const edit={
                "title":title,
                "desc":desc,
                "image":fName
            }
            if (req.file){
                const image=req.files.filename
                edit.image=image
            }
            PosterModel.findOneAndUpdate(id,{
                $set:edit
            }, {
                new:true
            }).then(poster => {
                res.json({ 'status': 'success', 'response': "Edited successfully" })
                res.redirect('/poster');
            })
            .catch(err => {
                res.json({ 'status': 'failed', 'response': "Unable to edit" })
            });
        }
    }
};