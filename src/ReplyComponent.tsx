import React from "react";
import CreateComment from "./CreateComment";
import { ReplyComponentProps } from "./interface";

const ReplyComponent = ({
  onDeleteComment,
  comment,
  onClickReplyButton,
  onClickEditButton,
  displayReplyBox,
  commentText,
  onInput,
  onSubmit
}: ReplyComponentProps) => {
  return (
    <div className="comment-button-container">
      <button onClick={onDeleteComment} className="delete-btn">
        Delete
      </button>
      <button onClick={onClickReplyButton}>Reply</button>
      <button onClick={onClickEditButton}>Edit</button>
      {displayReplyBox && (
        <CreateComment
          commentText={commentText}
          onInput={onInput}
          onSubmit={onSubmit}
          parentId={comment.parentId}
          id={comment.id}
        />
      )}
    </div>
  );
};

export default React.memo(ReplyComponent);
