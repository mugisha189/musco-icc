import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EventType } from '../../utils/data';
import NavSlider from './NavSlider';
import Link from '../core/Link';
// import { GiCakeSlice } from 'react-icons/gi'

interface Props {
  routes: EventType[];
}

const EventLinks = ({ routes }: Props) => {
  const [active, setActive] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname?.split('/')[1];
    if (!path) return;
    setActive(path);
  }, [pathname]);

  const activeEventStyle =
    'w-full h-[40px] border-2 hover:bg-blue-200 border-[#2076F8] px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-white bg-[#2076F8]';
  const eventStyle =
    'w-full h-[40px] border-2 hover:bg-[#2076F8] hover:text-white border-gray-300 px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#303030]';
  return (
    <NavSlider haveGap>
      {/* <div className='w-full flex justify-center gap-6 p-4'> */}
      {routes.map((item) => {
        const isHome = item.name === 'home' && active === '';
        const isActive = item.name === active || isHome || pathname === item.path;
        return (
          <Link className=" w-full m-2" href={`/${item.path}`} key={item.name}>
            <div className={` border-gray ${isActive ? activeEventStyle : eventStyle}`}>
              <span className="font-bold text-2xl xl:text-md ">{item.icon}</span>
              <span className="font-medium text-md block capitalize ">{item.name}</span>
            </div>
          </Link>
        );
      })}
      {/* </div> */}
    </NavSlider>
  );
};

export default EventLinks;
