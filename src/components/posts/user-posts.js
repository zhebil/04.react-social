import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { postsLoaded } from "../../actions";
import { withJsonPlaceholderService } from "../hoc";
import { ErrorIndicator, SeeMore, Spinner } from "../utility";
import Post from "./components/post";
import "./user-posts.scss";
const UserPosts = (props) => {
  const {
    jsonPlaceholderService,
    id,
    postsLoaded,
    posts,
    userPhoto,
    userName,
    userMail,
  } = props;

  const [fullWidth, setFullWidth] = useState(false);
  const [fetch, setFetch] = useState({ loading: true, error: false });
  const [fullPosts, setFullPosts] = useState(true);
  useEffect(() => {
    let mounted = true;

    const fetching = async () => {
      const postsFetchData = { postItems: [], postPhotos: {} };
      try {
        await jsonPlaceholderService.getUserPosts(id).then((data) => {
          postsFetchData.postItems = data;
        });
        await jsonPlaceholderService.getPostsPhoto(id).then((data) => {
          postsFetchData.postPhotos = data;
        });
      } catch (e) {
        console.log(e);
        setFetch({ loading: false, error: true });
      }

      postsLoaded(postsFetchData);
      if (mounted) {
        setFetch({ loading: false, error: false });
      }
    };

    fetching();
    return () => {
      mounted = false;
    };
  }, [jsonPlaceholderService, id, postsLoaded]);

  if (fetch.loading) {
    return <Spinner />;
  }
  if (fetch.error) {
    return <ErrorIndicator />;
  }
  const onPostSearch = (e) => {};
  const getPosts = (posts) => {
    return fullPosts ? posts.slice(0, 5) : posts;
  };
  return (
    <div className="posts">
      <div className="posts__header page-block">
        <h2 className={fullWidth ? "w-0" : "post__title page-block__title"}>
          Мои посты (<span>{posts.length}</span>)
        </h2>
        <div className={`posts__search ${fullWidth ? "w-100" : ""}`}>
          <TextField
            id="posts-search"
            label="Найти пост"
            type="search"
            variant="outlined"
            onFocus={() => {
              setFullWidth(true);
            }}
            onBlur={(e) => {
              if (e.target.value.length === 0) {
                setFullWidth(false);
              }
            }}
            onChange={onPostSearch}
            fullWidth={fullWidth}
          />
        </div>
      </div>
      <div className="posts__body">
        {getPosts(posts).map((item, i) => {
          const isFirst = i === 0 ? true : false;
          return (
            <Post
              key={item.id}
              post={item}
              isFirst={isFirst}
              userPhoto={userPhoto}
              userName={userName}
              userMail={userMail}
              idx={i}
            />
          );
        })}
        {fullPosts ? (
          <div className="right__link">
            <SeeMore
              setMore={() => {
                setFullPosts(!fullPosts);
              }}
              more={!fullPosts}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    ownProps: ownProps,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      postsLoaded: postsLoaded,
    },
    dispatch
  );
};

export default compose(
  withJsonPlaceholderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(UserPosts);
