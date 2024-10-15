import { Player } from '../types/types1';
import { PRankeAble } from './func1';

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const mixArray = <T = any>(arr: T[]) => {
  let currentIndex = arr.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
};
const postions = ['defender', 'midfielder', 'forward'];

export const fillLineUp = (arr: Player[], size: number) => {
  let newSize = size;
  const newArr = [...arr];
  const hasGK = newArr.some((player) => player.position.includes('goalkeeper'));
  if (!hasGK) {
    const dummyPlayer = {
      displayName: 'Dummy',
      position: ['goalkeeper'],
      _id: 'Dummy',
      number: Math.floor(Math.random() * 100),
    };
    newArr.push(dummyPlayer as unknown as Player);
    newSize--;
  }
  const s = newSize + 1;
  while (newArr.length < s) {
    const dummyPlayer = {
      displayName: 'Dummy',
      position: [postions[Math.floor(Math.random() * 3)]],
      _id: (Math.random() * 100000).toString(),
      number: Math.floor(Math.random() * 100),
    };
    newArr.push(dummyPlayer as unknown as Player);
  }
  return newArr;
};

export const removeDuplicates = (arr: PRankeAble[]) => {
  // use full name as key
  const map = new Map();
  for (const item of arr) {
    if (!map.has(item._id)) {
      map.set(item._id, true);
    }
  }
  return Array.from(map.keys()).map((id) => arr.find((player) => player._id === id)) as PRankeAble[];
};
