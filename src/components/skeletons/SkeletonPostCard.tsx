import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonPostCard() {
  return (
    <>
      <Skeleton
        height={140}
        count={4}
        className="relative p-6 rounded-lg my-3 flex border border-gray-200 dark:border-gray-800"
      />
    </>
  );
}
