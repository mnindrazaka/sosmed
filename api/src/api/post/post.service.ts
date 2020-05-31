import postModel, { PostDocument } from "./post.model";
import { PostRequest } from "./post.type";
import HttpException from "utils/httpException";

export default class PostService {
  getAllPost = () => {
    return postModel.find().populate("user").sort({ _id: -1 });
  };

  createPost = (userId: string, postRequest: PostRequest) => {
    return postModel.create({ ...postRequest, user: userId });
  };

  updatePost = (postId: string, postRequest: PostRequest) => {
    return new Promise<PostDocument>(async (resolve, reject) => {
      try {
        const editedPost = await postModel.findByIdAndUpdate(
          postId,
          postRequest,
          {
            new: true
          }
        );
        if (editedPost) resolve(editedPost);
        else throw new HttpException(400, "post not found");
      } catch (error) {
        reject(error);
      }
    });
  };

  deletePost = (postId: string) => {
    return new Promise<PostDocument>(async (resolve, reject) => {
      try {
        const deletedPost = await postModel.findByIdAndDelete(postId);
        if (deletedPost) resolve(deletedPost);
        else throw new HttpException(400, "post not found");
      } catch (error) {
        reject(error);
      }
    });
  };
}
