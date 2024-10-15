export default {
  name: 'event',
  title: 'Event',
  type: 'object',

  preview: {
    select: {
      title: 'type',
      subtitle: 'time  ',
    },
  },
  fields: [
    {
      name: 'type',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Goal', value: 'goal' },
          { title: 'Simple Comment', value: 'comment' },
          { title: 'Foul', value: 'faul' },
          { title: 'Yellow Card', value: 'yellowCard' },
          { title: 'Red Card', value: 'redCard' },
          { title: 'Ball Post', value: 'ballPost' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Describe the event',
    },
    {
      title: 'Time',
      name: 'time',
      type: 'number',
      description: 'the time for the event (ex : a minute in a match)',
    },
    {
      title: 'Scorer (optional)',
      name: 'scorer',
      type: 'reference',
      to: [{ type: 'player' }],
    },
    {
      title: 'team',
      name: 'team',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Away', value: 'away' },
        ],
      },
    },
  ],
};
