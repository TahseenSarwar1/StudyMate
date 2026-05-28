export function SkeletonCard() {
  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1 mr-4">
          <div className="h-3 w-1/4 rounded-full shimmer-bg" />
          <div className="h-6 w-1/2 rounded-md shimmer-bg" />
        </div>
        <div className="w-12 h-12 rounded-xl shimmer-bg" />
      </div>
      <div className="h-2 w-full rounded-full shimmer-bg mt-6" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-full shimmer-bg"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar() {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 rounded-xl shimmer-bg" />
      <div className="space-y-2 flex-1">
        <div className="h-3 w-1/3 rounded-full shimmer-bg" />
        <div className="h-3 w-1/2 rounded-full shimmer-bg" />
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="glass-card p-5 space-y-4 h-64 flex flex-col justify-end">
      <div className="flex items-end justify-between space-x-2 h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-full rounded-t-md shimmer-bg"
            style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
          />
        ))}
      </div>
    </div>
  );
}
