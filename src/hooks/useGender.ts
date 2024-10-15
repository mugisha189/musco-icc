import { Gender } from '@/utils/types/misc';
import { useEffect, useState } from 'react';

interface Options {
  key?: string;
  initialGender?: Gender;
}
/**
 * A hook to filter data based on gender
 * @param data
 * @param options
 * @returns [_filteredData, handleFilterGender, { setData }]
 */
export default function useGender<T = any>(data: T[], options: Options = {}) {
  const { key = 'gender', initialGender = 'male' } = options;
  const [_data, setData] = useState<T[]>(data);
  const [_filteredData, setFilteredData] = useState<T[]>(data);

  const handleFilterGender = (gender: Gender) => {
    const newData = _data.filter((item: any) => item[key] === gender);
    setFilteredData(newData);
  };

  useEffect(() => {
    if (data.length === 0) return;
    setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setFilteredData(_data.filter((item: any) => item[key] === initialGender));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_data]);

  return [_filteredData, handleFilterGender, { setData }] as const;
}
