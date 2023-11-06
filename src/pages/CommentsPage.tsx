import React from 'react'
import CommentsContainer from '../containers/CommentsContainer'

type UserProps = {
  currentUserId: string;
}

const CommentsPage = ({currentUserId}:UserProps) => {
  return (
    <CommentsContainer currentUserId={currentUserId}/>
  )
}

export default CommentsPage