import { CircularProgress } from 'react-cssfx-loading/lib';

function Loading() {
  return (
    <div className="Loading">
      <CircularProgress
        color="#9922ff"
        height="60px"
        width="60px"
      />
    </div>
  );
}

export default Loading;
