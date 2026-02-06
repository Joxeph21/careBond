
type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className }: SkeletonProps) {
  return <div className={`bg-grey animate-pulse rounded ${className}`} />;
}
