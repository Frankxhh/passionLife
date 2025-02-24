export const Spin = () => {
  return (
    <div className="grid h-10 w-10 origin-center animate-spin grid-cols-2 gap-1">
      <div className="loading-item h-3 w-3 rounded-xl bg-blue-200"></div>
      <div className="loading-item h-3 w-3 rounded-xl bg-blue-300"></div>
      <div className="loading-item h-3 w-3 rounded-xl bg-blue-400"></div>
      <div className="loading-item h-3 w-3 rounded-xl bg-blue-500"></div>
    </div>
  );
};
