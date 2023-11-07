import { useEffect, useState } from 'react'
import { constants } from '../contants';
import { CommentTypes, DataObject } from '../types';
import Comment from '../UI/Comment';
import CommentForm from '../UI/CommentForm';
import { createComment } from '../utils';

const CommentsContainer = () => {
  const [dbComments, setDbComments] = useState<CommentTypes[]>([]);
  const rootComments = dbComments.filter((comment) => !comment.parent_id);
  const [activeComment, setActiveComment] = useState<CommentTypes|null>(null);

  const addComment = (text:string, parendId?:string) => {
    const newComment = createComment(text, parendId);
    const updatedComments = [...dbComments, newComment];
    const dataObject = {comments: updatedComments};
    setDbComments(updatedComments);
    addCommentToDb(dataObject);
    setActiveComment(null);
  }

  const addCommentToDb = async (data:DataObject) => {
      try {
        const response = await fetch(`${constants.jsonUrl}/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log('radi');
        } else {
          console.log('ne radi');
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  const getReplies = (replyId: string) => {
    return dbComments
      .filter((comment) => comment.parent_id === replyId)
      .sort((a: CommentTypes, b: CommentTypes) => a.timestamp - b.timestamp);
  };

  const fetchComments = async () => {
    try {
        const response = await fetch(`${constants.jsonUrl}/data`);
        const data = await response.json();
        setDbComments(data.comments);
    } catch (error: any) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchComments();
  },[])

  return (
    <div>
      {rootComments.map((rootComment) => (
        <Comment 
          key={rootComment.id} 
          comment={rootComment} 
          getReplies={getReplies} 
          setActiveComment={setActiveComment} 
          activeComment={activeComment}
          addComment={addComment}
          replyNesting={0}
        />
      ))}
      <CommentForm handleSubmit={addComment}/>
    </div>
  )
}

export default CommentsContainer