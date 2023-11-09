import {CommentTypes} from '../../types';
import './style.scss'

type BtnProps = {
    comment: CommentTypes;
    setActiveComment: (comment: CommentTypes | null) => void;
    activeComment: CommentTypes | null;
    replyNesting: number;
    calculateNumOfReplies: () => string;
}

const ReplyBtn = ({activeComment, comment, setActiveComment, calculateNumOfReplies, replyNesting}: BtnProps) => {
  return (
    <button
        className='reply-btn'
        onClick={() => {
            (activeComment === null) ? setActiveComment(comment) : setActiveComment(null)
        }}
        disabled={replyNesting >= 2}
    >
        Reply {calculateNumOfReplies()}
    </button>
  )
}

export default ReplyBtn