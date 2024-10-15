'use client';
import { useApp } from '@/contexts/AppProvider';
import { useSanity } from '@/contexts/SanityProvider';
import { useIdle } from '@mantine/hooks';
import React, { useEffect } from 'react';
import EventLinks from '../components/constants/EventLinks';
import Feed from '../components/constants/Feed';
import GamingSidebar from '../components/constants/GamingSidebar';
import Header from '../components/constants/Header';
import { gamingEvents } from '../utils/data';
import { CompNav } from '../utils/types';
import { SEO } from '../utils/types/misc';
import LoadingView from '@/components/shared/LoadingView';
import { useUser } from '@/contexts/UserProvider';
import { useRouter } from 'next13-progressbar';

type Props = {
  children: React.ReactNode;
  title?: string;
  trending?: any[];
  isGeneral?: boolean;
  seo?: SEO;
  routes?: CompNav[];
};

const GamingLayout = (props: Props) => {
  const { getUserPredictions, getMatches } = useApp();
  const { client } = useSanity();
  const { user } = useUser();
  const router = useRouter();
  const idle = useIdle(15000);

  useEffect(() => {
    getUserPredictions?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('user is idle', idle);
    if (idle) return;
    console.log('fetching matches and predictions cause user is active', idle);
    getMatches?.(client);
    getUserPredictions?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idle]);

  if (!user) {
    router.push('/auth/login');
    return <LoadingView />;
  }

  return (
    <>
      <main className="w-full z-50 flex flex-col md:px-[2%] px-1 overflow-hidden h-screen">
        <div className="w-full flex flex-col border-b-2 border-gray">
          <Header />
        </div>
        <div className="flex w-full h-full gap-x-2 overflow-hidden">
          <GamingSidebar />
          <div className="flex flex-col w-full h-[full overflow-y-auto overflow-x-hidden">
            {!props.isGeneral && <EventLinks routes={gamingEvents} />}
            {/* {<CompNavBar routes={gamingNavs} />} */}
            <div className="flex flex-col h-[85vh] overflow-y-auto py-2 overflow-x-hidden">{props.children}</div>
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
};

export default GamingLayout;
