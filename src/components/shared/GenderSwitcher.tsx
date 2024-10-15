import { Gender } from '@/utils/types/misc';
import { SegmentedControl } from '@mantine/core';
import React from 'react';

interface Props {
  onChange: (value: Gender) => void;
  className?: string;
}

const GenderSwitcher = ({ onChange, className }: Props) => {
  return (
    <SegmentedControl
      defaultValue="male"
      data={[
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ]}
      w={'100%'}
      onChange={(value) => onChange(value as Gender)}
      className={className}
    />
  );
};

export default GenderSwitcher;
