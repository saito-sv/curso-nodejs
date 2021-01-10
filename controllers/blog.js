import { Post } from '../models/post.js'


export const listPosts = (req, res) => { 
  return res.json([])
}

export const newPost = (req, res) => {
  const postRecibido = new Post({ title: req.body.title, body: req.body.body, userId:req.userId})
  postRecibido.save((err, post) => {
    res.json(post)
  })
}

export const detail = (req, res) => { 
  Post.findById(req.params.id, (err, post) => {
    return res.json(post)
  })

}

export const deletePost = (req, res) => { 
  return res.json({})
}

export const updatePost = (req, res) => { 
  return res.json({})
}

export default {newPost,detail}