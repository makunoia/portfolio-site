export default () => {
  return (
    <div className="flex flex-col gap-40px scroll-mt-40px">
      {/* Block */}
      <div className="flex flex-col gap-8px md:gap-24px">
        {/* Block Title */}
        <div className="w-[180px] h-[24px] bg-bg-subtle animate-pulse rounded-4px" />
        {/* Block content */}
        <div className="flex flex-col items-start gap-4px w-full">
          <div className="w-full h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
          <div className="w-[95%] h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
          <div className="w-[80%] h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
          <div className="w-[84%] h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
          <div className="w-[60%] h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
        </div>
      </div>

      {/* Block */}
      <div className="flex flex-col gap-8px md:gap-24px">
        {/* Block Title */}
        <div className="w-[120px] h-[24px] bg-bg-subtle animate-pulse rounded-4px" />
        {/* Block content */}
        <div className="flex flex-col items-start gap-4px w-full">
          <div className="w-full h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
          <div className="w-[90%] h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
          <div className="w-[95%] h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
          <div className="w-[92%] h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
          <div className="w-[20%] h-[1rem] bg-bg-subtle animate-pulse rounded-4px" />
        </div>
      </div>
    </div>
  );
};
