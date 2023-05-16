export const getTimeStamp = ({ time }: { time: number }) => {
  const currTime = new Date().getTime();
  const diff = currTime - time;
  const secs = diff / 1000;
  switch (true) {
    case secs < 10:
      return " posted just now";
    case secs < 60:
      return " posted few seconds ago";
    case secs < 3600:
      return ` posted ${Math.ceil(secs / 60)} minutes ago`;
    case secs < 86400:
      return ` posted ${Math.ceil(secs / 3600)} hours ago`;
    case secs < 2678400:
      return ` posted ${Math.ceil(secs / 86400)} days ago`;
    case secs < 32140800:
      return ` posted ${Math.ceil(secs / 2678400)} months ago`;
    default:
      return ` posted ${Math.ceil(secs / 32140800)} years ago`;
  }
};
