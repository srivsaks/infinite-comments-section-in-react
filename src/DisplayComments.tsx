import React from "react";
import Comments from "./Comments";
import { CommentProps, DisplayCommentsProps } from "./interface";

const DisplayComments = ({
  comments,
  onDeleteComment,
  onReply,
  onUpdateReply
}: DisplayCommentsProps) => {
  return (
    <ul>
      {comments.map((comment: CommentProps) => {
        return (
          <React.Fragment key={comment.id}>
            <Comments
              comment={comment}
              onDeleteComment={onDeleteComment}
              onReply={onReply}
              onUpdateReply={onUpdateReply}
            />
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default React.memo(DisplayComments);
