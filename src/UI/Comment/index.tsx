import {CommentTypes} from '../../types';
import CommentForm from '../CommentForm';
import ReplyBtn from '../ReplyBtn';
import './style.scss'

type CommentProps = {
    comment: CommentTypes;
    getReplies: (replyId: string) => CommentTypes[];
    setActiveComment: (comment: CommentTypes | null) => void;
    addComment: (text:string, parendId?:string) => void;
    activeComment: CommentTypes | null;
    parentId?: null | string;
    replyNesting: number;
}

const Comment = ({comment, getReplies, setActiveComment, activeComment, addComment, replyNesting}:CommentProps) => {
    const isReplaying = activeComment && activeComment.id === comment.id;
    const replyId = comment.id;

    const calculateNumOfReplies = () => {
        let numOfReplies = getReplies(comment.id).length.toString(); 
        if (numOfReplies === '0') {
            return numOfReplies = ''
        } else {
            numOfReplies = `(${numOfReplies})`;
            return numOfReplies
        }
    }

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    

  return (
    <div className='comment'>
        <div className='comment__img-wrapper'>
            <img className='comment__img' src={comment.author.picture} alt='Author'/>
        </div>
        <div className='comment__container'>
            <div className='comment__content'>
                <div className='comment__author'>{comment.author.name}</div>
                <div className='comment__text'>{comment.text}</div>
            </div>
            <div className='comment__wrap'>
                <div className='comment__timestamp'>{formatTimestamp(comment.timestamp)}</div>
                <ReplyBtn 
                    comment={comment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    calculateNumOfReplies={calculateNumOfReplies}
                    replyNesting={replyNesting}
                />
            </div>
            {isReplaying && (
                <CommentForm handleSubmit={(text) => addComment(text, replyId)}/>
            )}
                {getReplies(comment.id).map((reply) => (
                <div key={reply.id} className='comment__replies'>
                    <div className='comment__replies-line'></div>
                    <Comment 
                        comment={reply} 
                        getReplies={getReplies} 
                        setActiveComment={setActiveComment} 
                        activeComment={activeComment}
                        parentId={comment.id}
                        addComment={addComment}
                        replyNesting={replyNesting + 1}
                    />
                </div>
                ))}
        </div>
    </div>
  )
}

export default Comment