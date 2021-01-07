import { Post } from '../models/post.js'

export const newPost = (req, res) => {
  const postRecibido = new Post({ title: req.body.title, body: req.body.body })
  postRecibido.save((err) => {
    res.redirect('/blog');
  })
}

export const detail = (req, res) => { 
  Post.findById(req.params.id, (err, post) => {
    return res.json(post)
  })

}

export default {newPost,detail  }