import {CommentTypes} from '../types';
import CommentForm from './CommentForm';

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

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

  return (
    <div className='comment'>
        <div className='comment__img-wrapper'>
            <img className='comment__img' src={comment.author.picture} alt='Author'/>
        </div>
        <div className='comment__container'>
            <div className='comment__content'>
                <div className='comment__author'>{comment.author.name}</div>
                <div className='comment__timestamp'>{formatTimestamp(comment.timestamp)}</div>
            </div>
            <div className='comment__text'>{comment.text}</div>
            <button
                onClick={() => {
                    (activeComment === null) ? setActiveComment(comment) : setActiveComment(null)
                }}
                disabled={replyNesting >= 2}
            >
                reply
            </button>
            {isReplaying && (
                <CommentForm handleSubmit={(text) => addComment(text, replyId)}/>
            )}
            <div className='comment__replies'>
                {getReplies(comment.id).map((reply) => (
                    <Comment 
                        key={reply.id} 
                        comment={reply} 
                        getReplies={getReplies} 
                        setActiveComment={setActiveComment} 
                        activeComment={activeComment}
                        parentId={comment.id}
                        addComment={addComment}
                        replyNesting={replyNesting + 1}
                    />
                ))}
            </div>
            
        </div>
    </div>
  )
}

export default Comment