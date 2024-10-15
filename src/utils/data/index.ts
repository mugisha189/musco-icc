import React from 'react';
import { BiBasketball, BiFootball, BiHome, BiTennisBall } from 'react-icons/bi';
import { GiVolleyballBall } from 'react-icons/gi';
import { CompNav } from '../types';

export const compNavs: CompNav[] = [
  {
    id: 1,
    name: 'Overview',
    path: '/',
  },
  {
    id: 11,
    name: 'Fixtures',
    path: '/fixtures',
  },
  {
    id: 2,
    name: 'Results',
    path: '/results',
  },
  {
    id: 3,
    name: 'Table',
    path: '/table',
  },
  {
    id: 4,
    name: 'Teams',
    path: '/teams',
  },
  {
    id: 5,
    name: 'Players',
    path: '/players',
  },
  {
    id: 6,
    name: 'Stats',
    path: '/stats',
  },
];

export const gamingNavs: CompNav[] = [
  {
    id: 1,
    name: 'Overview',
    path: '/',
  },
  {
    id: 2,
    name: 'Football',
    path: '/football',
  },
  {
    id: 3,
    name: 'Basketball',
    path: '/basketball',
  },
];

export const gamingEvents = [
  {
    name: 'overview',
    path: 'gaming',
    icon: React.createElement(BiHome),
  },
  {
    name: 'football',
    path: 'gaming/football',
    icon: React.createElement(BiFootball),
  },
  {
    name: 'basketball',
    path: 'gaming/basketball',
    icon: React.createElement(BiBasketball),
  },
  {
    name: 'volleyball',
    path: 'gaming/volleyball',
    icon: React.createElement(GiVolleyballBall),
  },
  // {
  //     name: "debate",
  //     path: "debate",
  //     icon: React.createElement(FaUsers),
  // },
  // {
  //     name: "pingpong",
  //     path: "pingpong",
  //     icon: React.createElement(BiTennisBall),
  // },
];

export interface EventType {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export const events: EventType[] = [
  {
    name: 'home',
    path: '',
    icon: React.createElement(BiHome),
  },
  {
    name: 'football',
    path: 'football',
    icon: React.createElement(BiFootball),
  },
  {
    name: 'basketball',
    path: 'basketball',
    icon: React.createElement(BiBasketball),
  },
  {
    name: 'volleyball',
    path: 'volleyball',
    icon: React.createElement(GiVolleyballBall),
  },
  {
    name: 'pingpong',
    path: 'pingpong',
    icon: React.createElement(BiTennisBall),
  },
];
