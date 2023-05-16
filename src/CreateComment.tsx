import React from "react";
import { CreateCommentProps } from "./interface";

const CreateComment = ({
  commentText,
  onInput,
  onSubmit,
  parentId,
  id
}: CreateCommentProps) => {
  return (
    <form
      onSubmit={(e: any) => {
        onSubmit(e, parentId, id);
      }}
      className="create-comment-form"
    >
      <input value={commentText} onInput={onInput} />
      <input type="submit" value="Create Comment" />
    </form>
  );
};

export default React.memo(CreateComment);
