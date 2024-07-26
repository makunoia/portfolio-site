export default () => {
  return (
    <section className="w-full mt-40px flex flex-col gap-16px md:flex-row md:gap-0px justify-between">
      <div className="w-full md:max-w-[250px] flex flex-col flex-1">
        <div className="h-24px bg-subtle/40 animate-pulse w-[120px]" />
      </div>
      <div className="w-full md:max-w-[400px] flex flex-col flex-grow flex-1 gap-24px">
        <div className="flex flex-col gap-16px h-fit w-full">
          <div className="h-20px bg-subtle/40 animate-pulse" />
          <div className="h-20px bg-subtle/40 animate-pulse" />
          <div className="h-20px bg-subtle/40 animate-pulse" />
          <div className="h-40px bg-subtle/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
