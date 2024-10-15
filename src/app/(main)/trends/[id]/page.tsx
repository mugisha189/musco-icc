import MainLayout from '@/layouts/MainLayout';
import { getTrendById } from '@/lib/query1';
import { seasonClient } from '@/lib/sanity';
import { BaseMetaProps } from '@/utils/types';
import { Trend } from '@/utils/types/types2';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const getTrend = async (id: string, season?: string) => {
  try {
    const trend = await seasonClient(season ?? '2024')?.fetch(getTrendById(id as string));
    return trend[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function generateMetadata(props: BaseMetaProps) {
  const season = props.searchParams.season;
  const trend: Trend | null = await getTrend(props.params.id, season);
  return {
    title: trend?.title,
    description: `${trend?.description?.slice(0, 100)}...`,
    openGraph: {
      type: 'website',
      images: [{ url: `/api/og?image=${trend?.image}`, alt: trend?.title, width: 800, height: 800 }],
      description: `${trend?.description?.slice(0, 100)}...`,
      title: trend?.title,
    },
  };
}

const TrendsIndex = async (props: BaseMetaProps) => {
  const season = props.searchParams.season;
  const trend: Trend | null = await getTrend(props.params.id, season);
  if (!trend) return notFound();

  return (
    <MainLayout isGeneral>
      <div className=" flex flex-col gap-y-3 five:p-3 p-1 w-full">
        <h1 className="text-lg font-semibold text-center">{trend?.title}</h1>
        <div className=" max-h-[70vh] w-full">
          <Image
            src={trend?.image ?? ''}
            height={1080}
            className=" h-full object-contain"
            width={1920}
            alt="TrendImage"
          />
        </div>
        {trend?.description.split('<nextp>').map((p, i) => (
          <p key={i} className=" mt-3">
            {p}
          </p>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrendsIndex;
