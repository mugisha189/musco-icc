'use client';
import { useSanity } from '@/contexts/SanityProvider';
import Image from 'next/image';
import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Carousel } from 'react-responsive-carousel';
import { useApp } from '@/contexts/AppProvider';

const Feed = () => {
  const { insights, getInsights } = useApp();
  const { client } = useSanity();

  React.useEffect(() => {
    if (!client) return;
    getInsights!(client);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);
  if (insights?.length === 0) return null;
  return (
    <div className="flex-col gap-y-3 lg:flex w-[350px] hidden ">
      <h1 className=" text-center font-semibold">Insights</h1>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        swipeable={true}
        renderArrowPrev={(click) => (
          <BiChevronLeft
            onClick={click}
            className=" absolute top-1/2 -translate-y-1/2 left-0 z-10 h-full duration-300 cursor-pointer hover:bg-black/10"
          />
        )}
        renderArrowNext={(click) => (
          <BiChevronRight
            onClick={click}
            className=" absolute top-1/2 -translate-y-1/2 right-0 h-full duration-300 cursor-pointer hover:bg-black/10"
          />
        )}
        showStatus={false}
        interval={9000}
      >
        {insights?.map((insight) => (
          <div key={insight._id} className="w-full  border-2 border-gray rounded-md  aspect-square h-full">
            <div className="w-full overflow-hidden h-[180px] ">
              <Image
                src={insight.image}
                alt={insight.title}
                className=" object-cover min-h-full object-center max-h-full"
                width={250}
                height={50}
              />
            </div>
            <h1 className="font-semibold text-center">{insight.title}</h1>
            <p className="font-md font-sans text-coolGray-500 text-left p-2 text-sm">{insight.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Feed;
