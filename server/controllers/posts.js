import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      like: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  // try {

  console.log("TESTING", req.body, req.params);
  const { id } = req.params;
  const { userId } = req.body;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }
  console.log("post", post);
  const isLiked = post.like.get(userId);

  console.log("isLiked", isLiked);

  if (isLiked) {
    post.like.delete(userId);
  } else {
    post.like.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { like: post.like },
    { new: true }
  );

  if (!updatedPost) {
    return res.status(400).json({ error: "Post not found" });
  }
  res.status(200).json(updatedPost);
  // }
  // catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
};
