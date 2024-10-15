import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  preview: {
    select: {
      title: 'name',
      subtitle: 'gender',
      media: 'logo',
    },
  },
  groups: [
    {
      title: 'Team Info',
      name: 'teamInfo',
      default: true,
    },
    {
      title: 'Team Players',
      name: 'teamPlayers',
    },
    {
      title: 'Team Stats',
      name: 'teamStats',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The team name W for women clubs . ex : Y2 FC (W)',
      validation: (Rule) => Rule.required(),
      group: 'teamInfo',
    }),
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'The team logo',
      group: 'teamInfo',
    },
    {
      name: 'isOfficial',
      title: 'Is Official',
      type: 'boolean',
      description: 'Is this team official ?',
      initialValue: false,
      group: 'teamInfo',
    },
    {
      name: 'players',
      title: 'Players',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'player' } }],
      validation: (rule) => rule.required(),
      group: 'teamPlayers',
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
      group: 'teamInfo',
    },
    // category
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The category where the team belongs to. ex : football, basketball, ...',
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
      group: 'teamInfo',
    },
    {
      name: 'coach',
      title: 'Coach',
      type: 'reference',
      to: { type: 'coach' },
      group: 'teamInfo',
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'overallTeamStats',
      description: 'Overall team stats',
      group: 'teamStats',
    },
  ],
});
