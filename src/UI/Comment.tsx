import {CommentTypes} from '../types';

type CommentProps = {
    comment: CommentTypes;
    getReplies: (replyId: string) => CommentTypes[];
}

const Comment = ({comment, getReplies}:CommentProps) => {

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
            
                <div className='comment__replies'>
                    {getReplies(comment.id).map((reply) => (
                        <Comment key={reply.id} comment={reply} getReplies={getReplies} />
                    ))}
                </div>
            
        </div>
    </div>
  )
}

export default Comment