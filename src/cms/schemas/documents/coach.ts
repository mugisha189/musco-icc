import { defineType } from 'sanity';

export default defineType({
  name: 'coach',
  title: 'Coach',
  type: 'document',
  preview: {
    select: {
      title: 'name',
      subtitle: 'team.name',
      media: 'profile',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Coach of ${subtitle}`,
        media,
      };
    },
  },
  fields: [
    // player info
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'name of a player',
      validation: (Rule) => Rule.required().min(3).max(300).warning('please provide a name for this player'),
    },
    {
      name: 'profile',
      title: 'Profile',
      type: 'image',
      description: 'profile image of a coach',
    },
    {
      name: 'team',
      title: 'Team',
      type: 'reference',
      description: 'The team where the coach belongs to. ex : Y2-Football',
      to: { type: 'team' },
    },
  ],
});
