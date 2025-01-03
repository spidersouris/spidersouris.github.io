import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type SkeletonGenericCardProps = {
  height: number;
  width?: number;
  count?: number;
};

export default function SkeletonGenericCard({
  height,
  width,
  count = 1,
}: SkeletonGenericCardProps) {
  return (
    <>
      {/* Weirdly, when multiple instances of a skeleton are rendered using the `count` parameter of react-loading-skeleton, they do not seem to inherit the properties of the parent,
    and `containerClassName` does not seem to solve the issue.
    That's why we loop through the count and render each skeleton separately. */}
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          height={height}
          width={width}
          className="relative flex rounded-lg border border-gray-200 dark:border-gray-800"
          containerClassName="skeleton-container"
        />
      ))}
    </>
  );
}
