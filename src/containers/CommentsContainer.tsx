import { useEffect, useState } from 'react'
import { constants } from '../contants';
import { Comment } from '../types';

type UserProps = {
    currentUserId: string;
}

const CommentsContainer = ({currentUserId}:UserProps) => {
  const [dbComments, setDbComments] = useState<Comment[]>([]);
  const rootComments = dbComments.filter((comment) => !comment.parent_id);

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

    </div>
  )
}

export default CommentsContainer