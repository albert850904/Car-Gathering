import { useEffect, useState, useContext } from "react";
import NotificationContext from "../../store/NotificationContext";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const notificationContext = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationContext.showNotification({
      title: "Upload Comment",
      message: "Uploading Comment, please wait a bit",
      status: "pending",
    });

    fetch(`/api/Comment/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((error) => {
          throw new Error(error.message || "something when wrong");
        });
      })
      .then((data) =>
        notificationContext.showNotification({
          title: "Success",
          message: "Successfully Uploaded",
          status: "success",
        })
      )
      .catch((error) =>
        notificationContext.showNotification({
          title: "Error",
          message: error.message || "Error occur when Uploading Comment",
          status: "error",
        })
      );
  }

  function fetchCommentsHandler() {
    fetch(`/api/Comment/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.commentList);
        setIsFetchingComments(false);
      });
  }

  useEffect(() => {
    if (!showComments) return;
    setIsFetchingComments(true);
    fetchCommentsHandler();
  }, [showComments]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
