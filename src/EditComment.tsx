import React from "react";
import { EditCommentProps } from "./interface";

const EditComment = ({
  editComment,
  onEdit,
  onCancelEdit,
  onClickOk
}: EditCommentProps) => {
  return (
    <div>
      <input value={editComment} onInput={onEdit} />
      <div>
        <button onClick={onClickOk}>Ok</button>
        <button className="cancel-btn" onClick={onCancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default React.memo(EditComment);
