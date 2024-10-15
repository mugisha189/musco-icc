import { defineType } from 'sanity';

export default defineType({
  name: 'fantasy',
  title: 'Fantasy',
  type: 'object',
  groups: [
    { title: 'Football', name: 'football' },
    { title: 'Basketball', name: 'basketball' },
  ],
  fields: [
    {
      title: 'Man of the match',
      name: 'manOfTheMatch',
      type: 'reference',
      to: [{ type: 'player' }],
      group: ['football', 'basketball'],
    },
    {
      title: 'First team to score',
      name: 'firstTeamToScore',
      type: 'reference',
      to: [{ type: 'team' }],
      group: 'football',
    },
    {
      title: 'Highest scoring player',
      name: 'highestScoringPlayer',
      type: 'reference',
      to: [{ type: 'player' }],
      group: 'basketball',
    },
  ],
});
