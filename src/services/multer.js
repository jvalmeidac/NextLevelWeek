const multer = require("multer");

module.exports = (multer({
    //Files Storage
    storage: multer.diskStorage({
        //Files destination
        destination: (req, file, cb) => {
            cb(null, "public/images");
        },

        //Files names
        filename: (req, file, cb) =>{
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    }),

    fileFilter: (req, file, cb) => {
        const isAccepted = ["image/png", "image/jpg", "image/jpeg"].find( acceptedFormat => acceptedFormat == file.mimetype );

        if(isAccepted){
            return cb(null, true);
        }

        return cb(null, false);
    }
}));