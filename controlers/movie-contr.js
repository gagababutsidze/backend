import express from "express";
import movie from "../models/movie.js";
const movieRouter = express.Router();
import Comment from "../models/comments.js";
import User from "../models/user.js";

/*import multer from 'multer'
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, '../client/src/data')
    },
    filename: (req, file, cb)=>{
        console.log(file);

        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

movieRouter.post('/upload', upload.single("image"), async (req,res) => {
    res.send(upload)
    console.log(upload)

    const imageName = req.file.filename;
    try {
       const mongo = await movie.create({file_link: `${imageName}`})
        console.log(mongo);
    } catch (error) {
        console.log(error);
    }
})*/







movieRouter.get('/', async (req, res) => {
    try{
    res.send(await movie.find({}))
    }
    catch(error){
        console.log(error);
    }
})


movieRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const found = await movie.findById(id)
        const {_id}=found
     
        let test = await Comment.find({movieId:_id})
        found.comments = found.comments.concat(test) 

        for(let i = 0; i < test.length; i++){
        
            let userId = test[i].userId

            

            let user = await User.findOne({_id: userId})



           let gaga = test[i].user = user
          

        }
            
           
             res.json(found)
       


    } catch (error) {
        console.log(error);
    }

})

export {movieRouter}; 