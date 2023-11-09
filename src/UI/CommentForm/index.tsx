import { useState, FormEvent } from 'react'
import './style.scss'

type submitProps = {
    handleSubmit: (text:string, parendId?:string) => void;
    isReplying?: boolean
}

const CommentForm = ({handleSubmit, isReplying}: submitProps) => {
    const [commentText, setCommentText] = useState('');
    const isTextareaEmpty = commentText.length === 0;
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(commentText);
        setCommentText('');
    }
    return (
        <form className={`comment-form ${isReplying ? 'comment-form--reply' : 'js-comment-form'}`} onSubmit={onSubmit}>
            <textarea placeholder='...type something' className='comment-form__textarea' value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
            <button className='comment-form__btn' disabled={isTextareaEmpty}>Send</button>
        </form>
    )
}

export default CommentForm