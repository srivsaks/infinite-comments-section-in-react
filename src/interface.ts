export interface CommentProps {
  parentId: string | null;
  children: Array<CommentProps>;
  content: string;
  id: number;
}

export interface CreateCommentProps {
  commentText: string;
  onInput: (e: any) => void;
  onSubmit: Function;
  parentId?: string | null;
  id?: number;
}

export interface ReplyComponentProps {
  onDeleteComment: () => void;
  comment: CommentProps;
  onClickReplyButton: () => void;
  onClickEditButton: () => void;
  displayReplyBox: boolean;
  commentText: string;
  onInput: (e: any) => void;
  onSubmit: Function;
}

export interface DisplayCommentsProps {
  onDeleteComment: (id: number, parentId: string | null) => void;
  comments: CommentProps[];
  onReply: (id: number, parentId: string | null, content: string) => void;
  onUpdateReply: Function;
}

export interface CommentsProps {
  onDeleteComment: (id: number, parentId: string | null) => void;
  comment: CommentProps;
  onReply: (id: number, parentId: string | null, content: string) => void;
  onUpdateReply: Function;
}

export interface EditCommentProps {
  editComment: string;
  onEdit: (e: any) => void;
  onCancelEdit: () => void;
  onClickOk: () => void;
}
