import { useCallback, useState } from "react";
import CreateComment from "./CreateComment";
import "./styles.css";
import { CommentProps } from "./interface";
import DisplayComments from "./DisplayComments";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setStorageData] = useLocalStorage({
    defaultValue: [],
    key: "comments"
  });

  const onInput = useCallback((e: any) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!commentText) return;
      const newComments = JSON.parse(JSON.stringify(comments));
      newComments.push({
        parentId: null,
        children: [],
        content: commentText,
        id: new Date().getTime()
      });
      setStorageData(newComments);
      setCommentText("");
    },
    [commentText, comments]
  );

  const addReplyRecursively = useCallback(
    (
      currId: number,
      id: number,
      childComment: CommentProps,
      children: CommentProps[]
    ) => {
      if (currId === id) {
        if (children.length === 0) children.unshift(childComment);
        else children.push(childComment);
        return;
      } else {
        for (let i = 0; i < children.length; i++) {
          addReplyRecursively(
            children[i].id,
            id,
            childComment,
            children[i].children
          );
        }
      }
    },
    []
  );

  const deleteReplyRecursively = useCallback(
    (id: number, comments: CommentProps[]) => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === id) {
          comments.splice(i, i + 1);
        } else deleteReplyRecursively(id, comments[i].children);
      }
    },
    []
  );

  const onDeleteComment = useCallback(
    (id: number, parentId: string | null) => {
      const newComments: CommentProps[] = JSON.parse(JSON.stringify(comments));
      if (parentId === null) {
        setStorageData(newComments.filter((item) => item.id !== id));
      } else {
        deleteReplyRecursively(id, newComments);
        setStorageData(newComments);
      }
    },
    [comments]
  );

  const updateReplyRecursively = (
    id: number,
    content: string,
    newComments: CommentProps[]
  ) => {
    for (let i = 0; i < newComments.length; i++) {
      if (id === newComments[i].id) {
        newComments[i].content = content;
        return;
      } else {
        updateReplyRecursively(id, content, newComments[i].children);
      }
    }
  };

  const onUpdateReply = useCallback(
    (id: number, content: string) => {
      const newComments: CommentProps[] = JSON.parse(JSON.stringify(comments));
      for (let i = 0; i < newComments.length; i++) {
        if (id === newComments[i].id) {
          newComments[i].content = content;
          break;
        } else {
          updateReplyRecursively(id, content, newComments[i].children);
        }
      }
      setStorageData(newComments);
    },
    [comments]
  );

  const onReply = useCallback(
    (id: number, parentId: string | null, content: string) => {
      const childComment: CommentProps = {
        parentId: id.toString(),
        children: [],
        content,
        id: new Date().getTime()
      };
      const newComments: CommentProps[] = JSON.parse(JSON.stringify(comments));
      if (parentId === null) {
        setStorageData(
          newComments.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                children: [childComment, ...item.children]
              };
            } else return item;
          })
        );
      } else {
        for (let i = 0; i < comments.length; i++) {
          addReplyRecursively(
            newComments[i].id,
            id,
            childComment,
            newComments[i].children
          );
        }
        setStorageData(newComments);
      }
    },
    [comments]
  );

  return (
    <div>
      <h1>Create Comment</h1>
      <CreateComment
        commentText={commentText}
        onInput={onInput}
        onSubmit={onSubmit}
      />
      <DisplayComments
        comments={comments}
        onDeleteComment={onDeleteComment}
        onReply={onReply}
        onUpdateReply={onUpdateReply}
      />
    </div>
  );
}
