import Image from "next/image";

export const People = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[300px] sm:h-[100px] md:w-[300px] md:h-[100px]">
          <Image
            src="/ergo.png"
            fill
            className="object-contain dark:hidden"
            alt="worker"
          />
          <Image
            src="/ergo-dark.png"
            fill
            className="hidden dark:block"
            alt="worker"
          />
        </div>
      </div>
    </div>
  );
};
