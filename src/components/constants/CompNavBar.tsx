import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { compNavs } from '@/utils/data';
import { CompNav } from '@/utils/types';
import NavSlider from './NavSlider';

interface CompNavsProps {
  routes?: CompNav[];
}

const CompNavBar = ({ routes = compNavs }: CompNavsProps) => {
  const [path, setPath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setPath(pathname ?? '');
  }, [pathname]);

  return (
    // <div className=' w-full flex items-center overflow-x-auto font-medium text-lg'>
    <NavSlider>
      {routes.map((nav, i) => {
        const isIndex =
          path.split('/')[1] === pathname?.split('/')[1] &&
          nav.name === 'Overview' &&
          pathname?.split('/').length === 2;
        const isActive = nav.path.split('/')[1] === path.split('/')[2] || isIndex;
        return (
          <Link
            key={i}
            href={`/${path.split('/')[1] + nav.path}`}
            className={`flex items-center justify-center border-b-2 p-2 ${
              isActive ? 'text-orange border-orange' : 'border-gray'
            } w-full cursor-pointer min-w-fit`}
          >
            <span className="text-base">{nav.name}</span>
          </Link>
        );
      })}
      {/* </div> */}
    </NavSlider>
  );
};

export default CompNavBar;
