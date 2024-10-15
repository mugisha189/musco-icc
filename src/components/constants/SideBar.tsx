import { useApp } from '../../contexts/AppProvider';
import Link from '../core/Link';

const SideBar = () => {
  const { trends } = useApp();
  return (
    <div className=" tab:flex hidden flex-col h-full max-w-[300px] w-1/4 gap-y-4 overflow-y-auto min-w-[200px]">
      {/* <input
				placeholder='Search...'
				className=' outline-none border-divBack border-2 rounded-md px-4  py-2 focus:border-orange duration-300 w-full'
				type='text'
			/> */}
      {/* <div className='flex flex-col w-full gap-y-3'>
				<span className='px-2'>Live matches</span>
				<div className='flex items-center justify-between bg-whiteblue border-2 p-2 rounded-md border-divBack cursor-pointer'>
					<div className='flex gap-x-2 items-start'>
						<Image src='/images/teamlogo.svg' height={20} width={20} alt='' />
						<span>Y1</span>
					</div>
					<span className=' text-xs'>vs</span>
					<div className='flex gap-x-2 items-start'>
						<span>Y2</span>
						<Image src='/images/teamlogo.svg' height={20} width={20} alt='' />
					</div>
				</div>
			</div> */}
      <div className="flex flex-col gap-y-2">
        <span className="px-2 font-semibold">🔥 Trending</span>
        <div className="flex flex-col rounded-md  border-divBack border-2 h-[80vh]">
          {trends?.map((trend, i) => (
            <Link
              href={`/trends/${trend._id}`}
              className=" w-full p-2 hover:bg-blue hover:text-white cursor-pointer rounded-md text-sm font-semibold"
              key={i}
            >
              {trend.title}
            </Link>
          ))}
          {trends?.length === 0 && <p className="text-center">No trending news</p>}
        </div>
      </div>
      {/* <div className="flex flex-col gap-y-2">
        <span className="px-2 font-semibold">Football Matchdays</span>
        <div className="flex flex-col py-5 rounded-md  border-divBack border-2">
          {new Array(5).fill(0).map((v, i) => (
            <Link
              href={`/mathday/matchday ${i + 1}`}
              className=" w-full p-2 hover:bg-blue hover:text-white cursor-pointer rounded-md text-sm font-semibold"
              key={i}
            >
              Matchday {i + 1}
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default SideBar;
