import multer from 'multer'
//multer to import file as dataset

const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

//creating an uploding middleware
const upload = multer({storage})

export default upload;