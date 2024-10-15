import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
// import sharp from 'sharp'; // TODO: Add sharp to the project

export const config = {
  runtime: 'edge',
};

export default async function (req: NextRequest) {
  const { searchParams } = req.nextUrl;
  // const name = searchParams.get('name');
  const image = searchParams.get('image');
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        {image ? (
          <img tw="object-contain " src={image} alt="og:Image" />
        ) : (
          <img
            tw="object-contain"
            src={'https://cdn.sanity.io/images/lxeru4rg/2024/6397e1d6c2687a0053715e42b746bf56e743717e-1024x1024.jpg'}
            alt="og:Image"
          />
        )}
      </div>
    ),
    {
      width: 1030,
      height: 1030,
    },
  );
}
