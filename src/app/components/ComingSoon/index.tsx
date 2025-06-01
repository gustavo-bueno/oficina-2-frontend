import { RiTimeLine } from "@remixicon/react";

type ComingSoonProps = {
  message: string;
};

const ComingSoon = ({ message }: ComingSoonProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
      <RiTimeLine className="w-24 h-24 text-primary mb-6" />
      <h2 className="text-[32px] font-bold text-primary mb-4">Em breve</h2>
      <p className="text-[18px] text-darkGrey text-center max-w-[400px]">
        {message}
      </p>
    </div>
  );
};

export default ComingSoon;
