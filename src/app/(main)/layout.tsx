import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Providers from './providers';

interface Props {
  children: React.ReactNode;
}

const MainAppLayout = ({ children }: Props) => {
  return <Providers>{children}</Providers>;
};

export default MainAppLayout;
