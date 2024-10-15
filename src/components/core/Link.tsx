'use client';
import { useSanity } from '@/contexts/SanityProvider';
import NextLink, { LinkProps } from 'next/link';
import React, { useEffect } from 'react';

type InternalLinkProps = LinkProps;

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof InternalLinkProps> &
  InternalLinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    withSeason?: boolean;
  };

const Link = (props: Props) => {
  const { season } = useSanity();
  const { href, children, ...rest } = props;
  const [finalHref, setFinalHref] = React.useState(href);

  useEffect(() => {
    const hrefUrl = new URL(href?.toString(), window.location.origin);
    const hrefSearchParams = new URLSearchParams(hrefUrl.search);
    const hrefSeason = hrefSearchParams.get('season');
    let finalHref = href;

    if (!hrefSeason) {
      finalHref = hrefUrl;
      hrefSearchParams.set('season', season ?? '2024');
      finalHref.search = hrefSearchParams.toString();
    }
    setFinalHref(finalHref.toString());
  }, [season, href]);
  return (
    <NextLink href={finalHref} {...rest}>
      {children}
    </NextLink>
  );
};

export default Link;
