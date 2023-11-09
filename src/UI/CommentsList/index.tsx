import Comment from "../Comment";
import CommentForm from "../CommentForm";
import {CommentTypes} from '../../types';
import './style.scss';

type CommentsListProps = {
    getReplies: (replyId: string) => CommentTypes[];
    setActiveComment: (comment: CommentTypes | null) => void;
    addComment: (text:string, parendId?:string) => void;
    activeComment: CommentTypes | null;
    groupCommentsByDate: () => Record<string, CommentTypes[]>;
}

const CommentsList = ({groupCommentsByDate, getReplies, setActiveComment, activeComment, addComment}: CommentsListProps) => {
  return (
    <div className='comments'>
      {Object.entries(groupCommentsByDate()).map(([date, comments]) => (
        <div key={date}>
          <h3 className='comments__date'>{date}</h3>
          {comments.map((rootComment) => (
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
        </div>
      ))}
      <CommentForm handleSubmit={addComment} />
    </div>
  )
}

export default CommentsList