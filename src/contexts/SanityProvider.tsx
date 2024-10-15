import { schemaTypes } from '@/cms/schemas';
import LoadingView from '@/components/shared/LoadingView';
import { getDataSetFromYear, getYearFromDataSet } from '@/utils/funcs/func1';
import { visionTool } from '@sanity/vision';
import { SanityClient, createClient } from 'next-sanity';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next13-progressbar';
import React, { JSXElementConstructor, ReactElement, useContext, useEffect } from 'react';
import { defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { structureTool } from 'sanity/structure';

interface SanityContextProps {
  config: any;
  dataSet: string | null;
  setDataSet: React.Dispatch<React.SetStateAction<string | null>>;
  client: SanityClient | null;
  setClient: React.Dispatch<React.SetStateAction<SanityClient | null>>;
  refresh: (year: string) => void;
  setConfig?: React.Dispatch<React.SetStateAction<any>>;
  season?: string | null;
}

const SanityContext = React.createContext<SanityContextProps>({
  config: null,
  dataSet: null,
  setDataSet: () => {},
  client: null,
  setClient: () => {},
  refresh: () => {},
});

export const useSanity = () => useContext(SanityContext);

interface Props {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

export const makeConfig = (dataSet?: string) => {
  return defineConfig({
    basePath: '/studio',
    name: 'rca-icc',
    title: 'RCA interclass competitions CMS',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
    useCdn: typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
    apiVersion: '2022-11-16',
    dataset: dataSet ?? 'production',
    plugins: [structureTool(), visionTool(), media()],
    schema: {
      types: schemaTypes as any,
    },
  });
};

const currYear = new Date().getFullYear();

const SanityProvider = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const [config, setConfig] = React.useState<any>(null);
  const [dataSet, setDataSet] = React.useState<string | null>(null);
  const [client, setClient] = React.useState<SanityClient | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [season, setSeason] = React.useState<string | null>(null); // [currYear, currYear - 1, currYear - 2, currYear - 3]
  const router = useRouter();
  const pathname = usePathname();

  const refresh = (year: string) => {
    const dts = getDataSetFromYear(year);
    console.log(dts, dataSet);
    if (dts === dataSet) return;
    console.log('refreshing');
    router.push(`${pathname}?season=${year}`);
  };

  // useEffect hell starts here 😂
  useEffect(() => {
    const q_season = searchParams?.get('season');
    console.log('params to change data set', q_season);
    console.log(' data set with param', dataSet);
    if (!q_season || q_season === getYearFromDataSet(dataSet!)) return;
    setSeason(q_season);
    setLoading(true);
    setTimeout(() => {
      const season = q_season ?? String(currYear);
      const dataSet = getDataSetFromYear(season);
      setDataSet(dataSet);
      setConfig(makeConfig(dataSet));
      const client = createClient(makeConfig(dataSet));
      setClient(client);
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const q_season = searchParams?.get('season');
    const season = q_season ?? String(currYear);
    const dataSet = getDataSetFromYear(season);
    setDataSet(dataSet);
    setConfig(makeConfig(dataSet));
    const client = createClient(makeConfig(dataSet));
    setClient(client);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!client || !config || loading || !dataSet) return <LoadingView />;

  return (
    <SanityContext.Provider
      value={{
        config,
        dataSet,
        setDataSet,
        client,
        setClient,
        refresh,
        setConfig,
        season,
      }}
    >
      {!client || !config || loading || !dataSet ? <LoadingView /> : React.cloneElement(children, { key: season })}
    </SanityContext.Provider>
  );
};

export default SanityProvider;
