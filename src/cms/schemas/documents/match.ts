import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'match',
  title: 'Match',
  type: 'document',
  preview: {
    select: {
      title: 'title',
    },
  },
  groups: [
    {
      title: 'Match',
      name: 'match',
      default: true,
    },
    {
      title: 'Match Stats',
      name: 'matchStats',
    },
    {
      title: 'Match Events',
      name: 'matchEvents',
    },
    {
      title: 'Match Lineup',
      name: 'matchLineup',
    },
    {
      title: 'Match Fantasy',
      name: 'matchFantasy',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'title of the match',
      validation: (Rule) => Rule.required(),
      initialValue: ({ homeTeam, awayTeam }) => {
        if (homeTeam && awayTeam) {
          return `${homeTeam.name} vs ${awayTeam.name}`;
        }
        return 'Match';
      },
      group: 'match',
    }),
    {
      name: 'banner',
      title: 'Banner',
      type: 'image',
      description: 'the banner for the match',
      options: {
        hotspot: true,
      },
      group: 'match',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'the description of the match',
      group: 'match',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'the date for the match',
      validation: (rule) => rule.required(),
      group: 'match',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'League', value: 'league' },
          { title: 'Friendly', value: 'friendly' },
        ],
      },
      validation: (rule) => rule.required(),
      group: 'match',
    },
    // gender
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Male', value: 'male' },
          { title: 'Female', value: 'female' },
        ],
      },
      validation: (rule) => rule.required(),
      group: 'match',
    },
    // category
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The category of the matchday ex : football, basketball, ...',
      options: {
        list: [
          { title: 'Football', value: 'football' },
          { title: 'Basketball', value: 'basketball' },
          { title: 'Volleyball', value: 'volleyball' },
          { title: 'Tennis', value: 'tennis' },
          { title: 'PingPong', value: 'pingpong' },
        ],
      },
      validation: (rule) => rule.required(),
      group: 'match',
    },
    {
      name: 'homeTeam',
      title: 'Home Team',
      type: 'reference',
      to: { type: 'team' },
      validation: (rule) => rule.required(),
      group: 'match',
    },
    {
      name: 'awayTeam',
      title: 'Away Team',
      type: 'reference',
      to: { type: 'team' },
      validation: (rule) => rule.required(),
      group: 'match',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'matchStatus',
      validation: (rule) => rule.required(),
      group: 'match',
    },
    {
      name: 'stats',
      title: 'Match stats',
      type: 'matchStats',
      group: 'matchStats',
    },
    {
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [{ type: 'event' }],
      group: 'matchEvents',
    },
    {
      name: 'homeTeamLineup',
      title: 'Home Team Lineup',
      type: 'lineup',
      group: 'matchLineup',
    },
    {
      name: 'awayTeamLineup',
      title: 'Away Team Lineup',
      type: 'lineup',
      group: 'matchLineup',
    },
    {
      name: 'fantasy',
      title: 'Fantasy',
      type: 'fantasy',
      group: 'matchFantasy',
    },
  ],
});
