import React, { ReactNode } from 'react';
import { FaInfoCircle, FaListOl, FaUser } from 'react-icons/fa';
import { MdScoreboard } from 'react-icons/md';

interface SideBarRoute {
  name: string;
  path: string;
  icon: ReactNode;
}

export const gameSidebarRoutes: SideBarRoute[] = [
  {
    name: 'Play Predictor',
    path: '/gaming',
    icon: React.createElement(MdScoreboard, { size: 25 }),
  },
  {
    name: 'My Predictions',
    path: '/gaming/predictions',
    icon: React.createElement(MdScoreboard, { size: 25 }),
  },
  {
    name: 'Standings',
    path: '/gaming/standings',
    icon: React.createElement(FaListOl, { size: 18 }),
  },
  {
    name: 'Help',
    path: '/gaming/help',
    icon: React.createElement(FaInfoCircle, { size: 18 }),
  },
  {
    name: 'Account',
    path: '/gaming/account',
    icon: React.createElement(FaUser, { size: 18 }),
  },
];
