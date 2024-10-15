'use client';
import { MantineProvider, createTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import React from 'react';
import Next13ProgressBar from 'next13-progressbar';
import UserProvider from '../../contexts/UserProvider';
import { Notifications } from '@mantine/notifications';
const AppProvider = dynamic(() => import('../../contexts/AppProvider'));
const SanityProvider = dynamic(() => import('../../contexts/SanityProvider'));

interface Props {
  children: React.ReactNode;
}

const theme = createTheme({
  /** Put your mantine theme override here */
});

const Providers = ({ children }: Props) => {
  return (
    <MantineProvider theme={theme}>
      <Next13ProgressBar color="#ff7b35" startPosition={0.3} stopDelayMs={200} height={'3px'} showOnShallow={true} />
      <SanityProvider>
        <UserProvider>
          <AppProvider>{children}</AppProvider>
        </UserProvider>
      </SanityProvider>
      <Notifications />
    </MantineProvider>
  );
};

export default Providers;
