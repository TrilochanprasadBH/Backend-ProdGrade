import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
      //we decide to store files temporariy in this file, hence it was created  public->temp 
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })