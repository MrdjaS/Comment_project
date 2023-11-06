import { useEffect, useState } from 'react'
import { constants } from '../contants';
import { CommentTypes } from '../types';
import Comment from '../UI/Comment';

type UserProps = {
    currentUserId: string;
}

const CommentsContainer = ({currentUserId}:UserProps) => {
  const [dbComments, setDbComments] = useState<CommentTypes[]>([]);
  const rootComments = dbComments.filter((comment) => !comment.parent_id);

  const getReplies = (replyId: string) => {
    return dbComments
      .filter((comment) => comment.parent_id === replyId)
      .sort((a: CommentTypes, b: CommentTypes) => a.timestamp - b.timestamp);
  };

  // const getFormattedDate = () => {
  //   const topComment = rootComments[0];
  //   console.log(rootComments);
  //   const date = new Date(topComment.timestamp);
  //   return date.toLocaleDateString('en-US', {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //   });
  // };

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
      {/* <div>{getFormattedDate()}</div> */}
      {rootComments.map((rootComment) => (
        <Comment key={rootComment.id} comment={rootComment} getReplies={getReplies}/>
      ))}
    </div>
  )
}

export default CommentsContainer