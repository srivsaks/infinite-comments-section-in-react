import React, { useCallback, useState } from "react";
import Comment from "./Comment";
import DisplayComments from "./DisplayComments";
import EditComment from "./EditComment";
import { CommentsProps } from "./interface";
import ReplyComponent from "./ReplyComponent";

const Comments = ({
  comment,
  onDeleteComment,
  onReply,
  onUpdateReply
}: CommentsProps) => {
  const [displayReplyBox, setDisplayReplyBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [shouldEditComment, setShouldEditComment] = useState(false);
  const [editComment, setEditComment] = useState(comment.content);

  const onInput = useCallback((e: any) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: any, parentId: string | null, id: number) => {
      e.preventDefault();
      if (!commentText) return;
      onReply(id, parentId, commentText);
      setDisplayReplyBox(false);
      setCommentText("");
    },
    [commentText]
  );

  const onEdit = useCallback((e: any) => {
    setEditComment(e.target.value);
  }, []);

  const onCancelEdit = useCallback(() => {
    setShouldEditComment(false);
    setEditComment(comment.content);
  }, [comment.content]);

  const onClickOk = useCallback(() => {
    if (!editComment) return;
    onUpdateReply(comment.id, editComment);
    setShouldEditComment(false);
  }, [editComment, comment]);

  const onDelete = useCallback(() => {
    onDeleteComment(comment.id, comment.parentId);
  }, [comment]);

  const onClickReplyButton = useCallback(() => {
    setDisplayReplyBox(true);
  }, []);

  const onClickEditButton = useCallback(() => {
    setShouldEditComment(true);
  }, []);

  return (
    <li key={comment.id} className="nested-comment-container">
      <div className="comment-container">
        {shouldEditComment ? (
          <EditComment
            editComment={editComment}
            onCancelEdit={onCancelEdit}
            onClickOk={onClickOk}
            onEdit={onEdit}
          />
        ) : (
          <Comment comment={comment} />
        )}
        <ReplyComponent
          commentText={commentText}
          displayReplyBox={displayReplyBox}
          comment={comment}
          onDeleteComment={onDelete}
          onInput={onInput}
          onSubmit={onSubmit}
          onClickEditButton={onClickEditButton}
          onClickReplyButton={onClickReplyButton}
        />
      </div>
      <DisplayComments
        comments={comment.children}
        onDeleteComment={onDeleteComment}
        onReply={onReply}
        onUpdateReply={onUpdateReply}
      />
    </li>
  );
};

export default React.memo(Comments);
