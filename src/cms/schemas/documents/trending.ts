import { defineType } from 'sanity';

export default defineType({
  name: 'trending',
  title: 'Trending',
  type: 'document',
  preview: {
    select: {
      subtitle: 'text',
      media: 'image',
    },
    prepare({ subtitle, media }) {
      return {
        title: 'Trending',
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
      description: 'the image for the trending',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'the title of the trending',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'description (Deprecated)',
      type: 'text',
      description: 'do not use this field. Use the content field instead',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
        {
          type: 'file',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Football', value: 'football' },
          { title: 'Basketball', value: 'basketball' },
          { title: 'Volleyball', value: 'volleyball' },
          { title: 'Debate', value: 'debate' },
          { title: 'Pingpong', value: 'pingpong' },
          { title: 'Fantasy', value: 'fantasy' },
          { title: 'Others', value: 'others' },
        ],
      },
      initialValue: 'others',
    },
  ],
});
