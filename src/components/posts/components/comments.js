import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { commentsLoaded } from "../../../actions";
import { withJsonPlaceholderService } from "../../hoc";
import { ErrorIndicator, Spinner } from "../../utility";
import CommentsItem from "./comments-item";
import "./comments.scss"
const Comments = (props) => {
  const { id, idx, jsonPlaceholderService, comments, commentsLoaded } = props;
  
  
  const [fetch, setFetch] = useState({ loading: true, error: false });
  useEffect(() => {
    const fetching = async () => {
      const commentsFetchData = { commentsItem: [], commentsItemPhoto: {} };
      await jsonPlaceholderService.getComments(id).then((data) => {
        commentsFetchData.commentsItem = data;
      });
      await jsonPlaceholderService.getCommentsPhoto(id).then((data) => {
        commentsFetchData.commentsItemPhoto = data;
      });
      await commentsLoaded(commentsFetchData, idx);
      setFetch({ loading: false, error: false });
    };
    fetching();
  }, [jsonPlaceholderService, id, idx,commentsLoaded]);

  
  const nullMessage = (<p className="comments__message">Коментарии отсутствуют</p>)

  if (fetch.loading) {
    return <Spinner />;
  }
  if (fetch.error) {
    return <ErrorIndicator />;
  }
  return ( 
  <ul className="comments">
  {comments.length === 0? nullMessage : (
    <>
    {comments.map(item=> {
     return <CommentsItem key={item.id} comment={item}/>
    })}
    </>
  )}
  </ul>
  )
};
const mapStateToProps = (state, props) => {
  return {
    comments: state.posts[props.idx].comments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      commentsLoaded: commentsLoaded,
    },
    dispatch
  );
};

export default compose(
  withJsonPlaceholderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Comments);
