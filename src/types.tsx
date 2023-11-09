export interface CommentTypes {
  id: string;
  parent_id?: string;
  author: {
    name: string;
    picture: string;
  };
  text: string;
  timestamp: number;
  replies?: CommentTypes[];
}

export interface DataObject {
    comments: CommentTypes[];
}