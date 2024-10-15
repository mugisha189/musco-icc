'use client';
import Header from '@/components/constants/Header';
import Head from 'next/head';
import React from 'react';
import CompNavBar from '../components/constants/CompNavBar';
import EventLinks from '../components/constants/EventLinks';
import Feed from '../components/constants/Feed';
import SideBar from '../components/constants/SideBar';
import { events } from '../utils/data';
import { CompNav } from '../utils/types';
import { SEO } from '../utils/types/misc';

type Props = {
  children: React.ReactNode;
  title?: string;
  trending?: any[];
  isGeneral?: boolean;
  seo?: SEO;
  routes?: CompNav[];
};

const MainLayout = (props: Props) => {
  const { title, seo } = props;
  const host = window.location.host;
  const protocol = window.location.protocol;
  const baseUrl = `${protocol}//${host}`;
  // const [isExploding, setIsExploding] = useState(true);

  return (
    <>
      <Head>
        <title>{title ?? 'RCA-ICC'}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <>
          <meta
            name="description"
            content={seo?.description?.slice(0, 200) ?? 'RCA-ICC- Home of all RCA interclass Competitions'}
          />
          <meta property="og:title" content={seo?.title ?? 'RCA-ICC- Home of all RCA interclass Competitions'} />
          <meta name="type" property="og:type" content="article" />
          <meta
            name="image"
            property="og:image"
            content={seo?.image ? `${baseUrl}/api/og?image=${seo?.image}` : `${baseUrl}/api/og`}
          />
          <meta
            name="description"
            property="og:description"
            content={
              seo?.description ??
              'Welcome to RCA interclass Competition Website, where education and competition go hand in hand.'
            }
          />
        </>
      </Head>
      <main className="w-full z-50 flex flex-col md:px-[2%] px-1 overflow-hidden h-screen">
        <div className="w-full flex flex-col border-b-2 border-gray">
          <Header />
        </div>
        <EventLinks routes={events} />
        <div className="flex w-full h-full gap-x-2 overflow-hidden">
          <SideBar />
          <div className="flex flex-col w-full h-[full overflow-y-auto overflow-x-hidden">
            {props.isGeneral ? null : <CompNavBar />}
            <div className="flex flex-col h-[85vh] overflow-y-auto py-2 overflow-x-hidden">{props.children}</div>
          </div>
          <Feed />
        </div>
      </main>
      {/* <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
        {isExploding && (
          <ConfettiExplosion
            {...{
              force: 0.8,
              duration: 3000,
              particleCount: 250,
              width: 1600,
              particleSize: 6,
            }}
          />
        )}
      </div> */}
    </>
  );
};

export default MainLayout;
