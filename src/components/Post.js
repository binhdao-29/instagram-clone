import React, { useState, useEffect } from 'react'
import './Post.css'
import firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar'
import { db } from '../firebase';

import heart from '../icons/heart.svg';
import heartClick from '../icons/heartClick.svg';
import send from '../icons/send.svg';
import more from '../icons/more.svg';
import face from '../icons/face.svg';
import chat from '../icons/chat.svg';

function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [like, setLike] = useState(false);

    let heartIcon = like ? heartClick : heart;

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
                <div className="post__headerAvatar">
                    <Avatar 
                        className="post__avatar"
                        alt={username} 
                        src="/static/images/avatar/1.jpg" />
                    <h3>{username}</h3>
                </div>
                <img src={more} alt="" width={20} height={20} />
            </div>
            
            <img className="post__image" 
                src={imageUrl}
                alt="" 
            />

            <div className="post__icons">
                <img onClick={() => setLike(!like)} src={heartIcon} alt="" width={28} height={28} />
                <img src={chat} alt="" width={24} height={24} />
                <img src={send} alt="" width={24} height={24} />
            </div>

            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            {user && (
                <form className="post__commentBox">
                    <img src={face} alt="" width={24} height={24} />
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
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
