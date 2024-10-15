import { defineType } from 'sanity';

export default defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  preview: {
    select: {
      subtitle: 'description',
      media: 'image',
    },
    prepare({ subtitle, media }) {
      return {
        title: 'Insight',
        subtitle: subtitle ? `content : ${subtitle}` : 'no text',
        media: media,
      };
    },
  },
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'the image for the insight',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'the title of the insight',
      validation: (Rule) => Rule.required().min(3).max(100),
    },
    {
      name: 'description',
      title: 'description',
      type: 'text',
      description: 'the description of the insight',
      validation: (Rule) => Rule.required().min(3).max(300),
    },
  ],
});
