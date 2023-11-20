type DotProps = {
  num: number;
  scrollIndex: number;
};

const Dot = ({ num, scrollIndex }: DotProps) => {
  return (
    <div className={`${scrollIndex === num ? "bg-sub" : "bg-softestmain"} w-4 h-4  rounded-full transition-all`}></div>
  );
};

type DotsProps = {
  scrollIndex: number;
};

const Dots = ({ scrollIndex }: DotsProps) => {
  return (
    <div className="fixed top-[75%] right-[40px] z-50">
      <div className="flex flex-col justify-between items-center w-20 h-[100px]">
        <Dot num={1} scrollIndex={scrollIndex}></Dot>
        <Dot num={2} scrollIndex={scrollIndex}></Dot>
        <Dot num={3} scrollIndex={scrollIndex}></Dot>
        <Dot num={4} scrollIndex={scrollIndex}></Dot>
      </div>
    </div>
  );
};

export default Dots;
