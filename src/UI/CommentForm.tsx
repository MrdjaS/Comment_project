import React, { useState, FormEvent } from 'react'

type submitProps = {
    handleSubmit: (text:string, parendId?:string) => void
}

const CommentForm = ({handleSubmit}: submitProps) => {
    const [commentText, setCommentText] = useState('');
    const isTextareaEmpty = commentText.length === 0;
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(commentText);
        setCommentText('');
    }
    return (
        <form onSubmit={onSubmit}>
            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
            <button disabled={isTextareaEmpty}>Send</button>
        </form>
        
    )
}

export default CommentForm