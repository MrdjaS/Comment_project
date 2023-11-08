import { useEffect, useState } from 'react'
import { constants } from '../contants';
import { CommentTypes, DataObject } from '../types';
import CommentsList from '../UI/CommentsList';
import { createComment } from '../utils';


const CommentsContainer = () => {
  const [dbComments, setDbComments] = useState<CommentTypes[]>([]);
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
        await fetch(`${constants.jsonUrl}/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error("Error:", error);
      }
  };

  const getReplies = (replyId: string) => {
    return dbComments
      .filter((comment) => comment.parent_id === replyId)
      .sort((a: CommentTypes, b: CommentTypes) => a.timestamp - b.timestamp);
  };

  const groupCommentsByDate = () => {
    const groupedComments: Record<string, CommentTypes[]> = {};
  
    dbComments
      .filter((comment) => !comment.parent_id)
      .forEach((comment) => {
        const date = new Date(comment.timestamp);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        const day = date.toLocaleDateString('en-US', { day: 'numeric' });
        const month = date.toLocaleDateString('en-US', { month: 'numeric' });
        const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  
        const formattedDate = `${weekday}, ${day}.${month}.${year}`;
  
        if (!groupedComments[formattedDate]) {
          groupedComments[formattedDate] = [];
        }
        groupedComments[formattedDate].push(comment);
      });
  
    return groupedComments;
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
    <CommentsList 
      getReplies={getReplies}
      setActiveComment={setActiveComment}
      addComment={addComment}
      activeComment={activeComment}
      groupCommentsByDate={groupCommentsByDate}
    />
  )
}

export default CommentsContainer