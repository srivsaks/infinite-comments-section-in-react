import React from "react";
import { getTimeStamp } from "./getTimeStamp";

const Comment = ({ comment }: any) => {
  return (
    <div className="comment-content">
      {comment.content}
      <span className="timestamp">
        {getTimeStamp({ time: comment.id })}
      </span>{" "}
    </div>
  );
};

export default React.memo(Comment);
