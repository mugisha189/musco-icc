import { defineType } from 'sanity';

export default defineType({
  name: 'matchStats',
  title: 'Match Stats',
  type: 'object',

  groups: [
    {
      title: 'Football Match Stats',
      name: 'footballMatchStats',
    },
    {
      title: 'Basketball Match Stats',
      name: 'basketballMatchStats',
    },
  ],

  fields: [
    {
      name: 'homeTeamStats',
      title: 'Home Team Stats',
      type: 'matchTeamStats',
      validation: (rule) => rule.required(),
    },
    {
      name: 'awayTeamStats',
      title: 'Away Team Stats',
      type: 'matchTeamStats',
      validation: (rule) => rule.required(),
    },
  ],
});
