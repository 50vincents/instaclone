import React, {useState, useEffect} from 'react'
import "../Post.css";
import Avatar from "@material-ui/core/Avatar"
import { db } from '../firebase';
import firebase from 'firebase';

// collection of posts, each post is a document
function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId) // post document
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => { // get snapshot listener for that; every time comment changes for that specific post
          setComments(snapshot.docs.map(doc => doc.data()))
        });   
    }

    return () => {
      unsubscribe();
    };
  }, [postId])

  const postComment = (event) => {
    event.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      username: user.displayName,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }

  return (
    <div className="post">

      <div className="post-header">
        <Avatar
          className="post-avatar"
          alt="RafehQazi"
          src=""
        />
        <h3>{username}</h3>
      </div>

      <img className="post-image" src={imageUrl} alt=""/>

      <h4 className="post-text"><strong>{username}</strong> {caption}</h4>

      <div className="post-comment-box">
        {
          comments.map((comment) => {
            return (
              <p>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            )
          })
        }
      </div>

      {user && (
        <form className="post-comments">
          <input
            className="post-input"
            type="text"
            placeholder="Enter a comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button
            className="post-button"
            type="submit"
            disabled={!comment}
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
      
    </div>
  )
}

export default Post
