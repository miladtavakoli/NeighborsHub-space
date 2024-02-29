import Apis from "services/apis";
// import { , addNewAddress } from "store/slices/userSlices";
import {
  addPost,
  setPosts,
  setMyPosts,
  moreDetailsPost,
  removePost,
  setUniqueLocation,
  setLocationPosts,
  like,
  deleteLike,
} from "store/slices/postsSlices";
import { startLoading, endLoading } from "store/slices/appSlices";

export const getPosts = (data) => async (dispatch) => {
  // dispatch(startLoading());
  return Apis.posts.getPosts(data).then((res) => {
    console.log(res, "test");
    dispatch(setPosts(res.posts?.results || []));
  });
  // .finally(() => dispatch(endLoading()));
};

export const getDetailsPost = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .getDetailsPost(data)
    .then((res) => {
      console.log(res, "test");
      dispatch(moreDetailsPost(res.post || []));
    })
    .finally(() => dispatch(endLoading()));
};

export const getLocationPosts = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .getLocationPosts(data)
    .then((res) => {
      dispatch(setLocationPosts(res?.posts?.results || []));
      console.log(res, "test");
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const getUniqueLocation = (data, signal) => async (dispatch) => {
  // dispatch(startLoading());
  return Apis.posts.getUniqueLocation(data, signal).then((res) => {
    console.log(res, "test");
    dispatch(setUniqueLocation(res.posts?.results || []));
  });
  // .finally(() => dispatch(endLoading()));
};

export const getMyPosts = () => async (dispatch) => {
  // dispatch(startLoading());
  return Apis.posts.getMyPosts().then((res) => {
    console.log(res, "test");
    dispatch(setMyPosts(res.posts?.results || []));
    return res;
  });
  // .finally(() => dispatch(endLoading()));
};

export const createPost = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .createPost(data)
    .then((res) => {
      console.log(res, "test");
      dispatch(addPost(res.post || []));
    })
    .finally(() => dispatch(endLoading()));
};

export const deletePost = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .deletePost(data)
    .then((res) => {
      console.log(res, "test");
      dispatch(removePost(data));
    })
    .finally(() => dispatch(endLoading()));
};

export const likeAction = (data) => async (dispatch) => {
  return Apis.posts.like(data).then((res) => {
    console.log(res, "test");
    dispatch(like(data));
  });
};

export const deleteLikeAction = (data) => async (dispatch) => {
  return Apis.posts.deleteLike(data).then((res) => {
    console.log(res, "test");
    dispatch(deleteLike(data));
  });
};
