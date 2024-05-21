import express from 'express';
import Comment from '../models/comments.js';
import User from '../models/user.js';
import movie from '../models/movie.js';

const commentRouter = express.Router();

commentRouter.post('/', async (req, res) => {
    const {userId, content, movieId} = req.body;
try{
    const findUser = await User.findById(userId)
    const findMovie = await movie.findById(movieId)

    if(findUser && findMovie) {
        const commentt = new Comment ({
            comment: content,
            userId: userId,
            movieId: movieId
        })
          const savedComment = await commentt.save()
         
    
        res.json(savedComment)
    
    }
}
 catch (error) {
     if (error.kind === "ObjectId" && error.name === "CastError") {
       res.status(400).json({ error: "malformated id" });
     } else {
       res.send(error.message);
     }  
}})




commentRouter.get('/', async (req, res) => {
   res.send(await Comment.find({})) 
})

export {commentRouter}






