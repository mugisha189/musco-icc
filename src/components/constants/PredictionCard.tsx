import Image from 'next/image';

const PredictionCard = () => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-md h-52 max-w-64 items-center  ">
      <div className="flex gap-2 align-middle ">
        <div className="flex gap-3 align-middle text-center flex-col">
          <div className="flex items-center gap-x-2">
            <Image src={'/images/teamImage.svg'} alt="team1" width={30} height={20} />
            <p className="text-md text-slate-700">Y1</p>
          </div>
        </div>

        <input
          type="text"
          name=""
          id=""
          className="border-2 border-blue w-10 h-10 rounded-lg outline-none text-center font-bold"
        />

        <input
          type="text"
          name=""
          id=""
          className="border-2 border-blue w-10 h-10 rounded-lg outline-none text-center font-bold"
        />

        <div className="flex gap-3 align-middle text-center flex-col">
          <div className="flex items-center gap-x-2">
            <p className="text-md text-slate-700">Y2</p>
            <Image src={'/images/teamImage2.svg'} alt="team1" width={30} height={20} />
          </div>
        </div>
      </div>
      <h3 className="text-center mt-2 font-bold text-warmGray-700 text-sm">Popular Predictions</h3>
      <div className="flex justify-center gap-2 mt-2">
        <div className="flex text-white font-bold justify-center align-middle text-sm rounded-xl bg-[#2076F8] w-10">
          <p>3</p>
          <span>-</span>
          <p>2</p>
        </div>
        <div className="flex text-white font-bold justify-center align-middle text-sm rounded-xl bg-[#2076F8] w-10">
          <p>2</p>
          <span>-</span>
          <p>1</p>
        </div>
        <div className="flex text-white font-bold justify-center align-middle text-sm rounded-xl bg-[#2076F8] w-10">
          <p>1</p>
          <span>-</span>
          <p>0</p>
        </div>
      </div>
      <div className="w-full mt-2"></div>
    </div>
  );
};

export default PredictionCard;
