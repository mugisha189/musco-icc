export type CompNav = {
  id: number;
  name: string;
  path: string;
};

export interface SeasonData<T = any> {
  [key: string]: T;
}

export interface BaseMetaProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}

export interface Trend {
  _id: string;
  title: string;
  description: string;
  image: string;
}
