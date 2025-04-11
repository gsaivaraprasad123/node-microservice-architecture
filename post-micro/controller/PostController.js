import axios from "axios";
import prisma from "../config/db.config.js";

class PostController {
  static async index(req, res) {
    try {
      const posts = await prisma.post.findMany({});

      //Method 1
      //   let postWithUsers = await Promise.all(
      //     posts.map(async (post) => {
      //       const res = await axios.get(
      //         `${process.env.AUTH_MICRO_URL}/api/getuser/${post.user_id}`
      //       );

      //       return {
      //         ...post,
      //         ...res.data,
      //       };
      //     })
      //   );

      //Method 2.

      let userIds = [];
      posts.forEach((item) => {
        userIds.push(item.user_id);
      });

      const response = await axios.post(
        `${process.env.AUTH_MICRO_URL}/api/getusers`,
        userIds
      );

      const users = {};
      response.data.users.forEach((item) => {
        users[item.id] = item;
      });

      //   let postWithUsers = await Promise.all(
      //     posts.map((post) => {
      //       const user = users.find((item) => item.id === post.user_id);
      //       return {
      //         ...post,
      //         user,
      //       };
      //     })
      //   );

      //Method 3
      let postWithUsers = await Promise.all(
        posts.map((post) => {
          const user = users[post.user_id];

          return {
            ...post,
            user,
          };
        })
      );

      return res.json({ postWithUsers });
    } catch (error) {
      console.log("The post fetch error : ", error);

      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async store(req, res) {
    try {
      const authUser = req.user;
      const { title, content } = req.body;
      const post = await prisma.post.create({
        data: {
          user_id: authUser.id,
          title,
          content,
        },
      });

      return res.json({ message: "Post created successfully!", post });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
}

export default PostController;
