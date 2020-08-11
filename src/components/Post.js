import React from 'react'
import "../Post.css";
import Avatar from "@material-ui/core/Avatar"

// collection of posts, each post is a document
function Post({ username, caption, imageUrl }) {
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
    </div>
  )
}

export default Post
