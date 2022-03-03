const fileSev = require("../services/file")
const fs = require("fs")
const codes = require("../common/codes")

//create Single Image
const createSingleImage = (req, res) => {

    const { filename  } = req.file

      fileSev.createSingleImage(filename)
          .then(result => {

            res.status(codes.ok).json({ err: false , msg : result })

          }).catch(err => res.status(codes.badRequest).json({ err: true, msg: err }))


}



//get Single Image View
const getSingleImageView = (req, res) => {
    const { id } = req.params

  fileSev.getSingleImage(id).then(result => {
    fs.readFile(`public/images/${result.imageUrl}`, function (err, data) {
      if (err) res.status(codes.badRequest).json({ err: true, msg: err })
      else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      }
    });

  }).catch(err => res.status(codes.badRequest).json({ err: true, msg: err }))
  


}



module.exports = {
    createSingleImage ,
    getSingleImageView 
}
