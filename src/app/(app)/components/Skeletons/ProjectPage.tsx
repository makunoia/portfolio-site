import BackButton from "@/components/Projects/BackButton";

export default () => {
  return (
    <main className="project-page-grid mx-auto my-[80px]">
      <div className="flex flex-col mb-20px md:mb-60px md:col-start-2 md:col-end-3 gap-40px">
        <BackButton />
        <div
          id="page-title"
          className="flex flex-col md:flex-row gap-24px justify-between"
        >
          <div className="flex flex-col gap-24px w-full sm:min-w-[350px]">
            <div className="flex flex-col gap-4px">
              {/* Title */}
              <div className="w-[280px] h-[52px] bg-subtle animate-pulse rounded-4px" />

              {/* Mobile Description */}
              <div className="flex flex-col gap-4px mt-4px w-full md:hidden">
                <div className="w-[70%] h-[1.5rem] bg-subtle animate-pulse rounded-4px" />
              </div>
            </div>

            {/* Project badges */}
            <div className="flex flex-row gap-8px">
              <div className="w-[90px] h-[44px] rounded-24px bg-subtle animate-pulse" />
              <div className="w-[120px] h-[44px] rounded-24px bg-subtle animate-pulse" />
            </div>

            {/* Roles and Status */}
            <div className="flex flex-row gap-16px">
              <div className="flex flex-col gap-4px w-[100px]">
                <div className="w-[40px] h-[12px] bg-subtle animate-pulse rounded-4px" />
                <div className="w-[75px] h-[14px] bg-subtle animate-pulse rounded-4px" />
              </div>

              <div className="flex flex-col gap-4px w-[50px]">
                <div className="w-[30px] h-[12px] bg-subtle animate-pulse rounded-4px" />
                <div className="w-[45px] h-[14px] bg-subtle animate-pulse rounded-4px" />
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="hidden flex-col items-start gap-4px w-[150px] md:inline-flex">
            <div className="w-[150px] h-[1rem] bg-subtle animate-pulse rounded-4px" />
            <div className="w-[140px] h-[1rem] bg-subtle animate-pulse rounded-4px" />
            <div className="w-[80px] h-[1rem] bg-subtle animate-pulse rounded-4px" />
          </div>
        </div>
      </div>

      <article className="md:col-start-2 md:col-end-3 flex flex-col gap-60px">
        <section className="content-block flex flex-col gap-40px scroll-mt-24px">
          <div className="flex flex-row gap-16px items-center w-full">
            {/* Heading Title */}
            <div className="w-[110px] h-[16px] bg-subtle animate-pulse rounded-4px" />
            <hr className="opacity-30" />
          </div>

          <div className="flex flex-col gap-40px scroll-mt-40px">
            {/* Block */}
            <div className="flex flex-col gap-8px md:gap-24px md:justify-between md:flex-row">
              {/* Block Title */}
              <div className="w-[180px] h-[24px] bg-subtle animate-pulse rounded-4px" />
              {/* Block content */}
              <div className="flex flex-col items-start gap-4px w-[50%]">
                <div className="w-full h-[1rem] bg-subtle animate-pulse rounded-4px" />
                <div className="w-[80%] h-[1rem] bg-subtle animate-pulse rounded-4px" />
                <div className="w-[60%] h-[1rem] bg-subtle animate-pulse rounded-4px" />
              </div>
            </div>

            {/* Block */}
            <div className="flex flex-col gap-8px md:gap-24px md:justify-between md:flex-row">
              {/* Block Title */}
              <div className="w-[120px] h-[24px] bg-subtle animate-pulse rounded-4px" />
              {/* Block content */}
              <div className="flex flex-col items-start gap-4px w-[50%]">
                <div className="w-full h-[1rem] bg-subtle animate-pulse rounded-4px" />
                <div className="w-[90%] h-[1rem] bg-subtle animate-pulse rounded-4px" />
                <div className="w-[95%] h-[1rem] bg-subtle animate-pulse rounded-4px" />
                <div className="w-[20%] h-[1rem] bg-subtle animate-pulse rounded-4px" />
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};
