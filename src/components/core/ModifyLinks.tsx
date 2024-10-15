import { useSanity } from '@/contexts/SanityProvider';
import { useEffect } from 'react';

const ModifyLinks = () => {
  const { season, dataSet } = useSanity();

  useEffect(() => {
    const handleMutation = () => {
      const anchors = document.querySelectorAll('a');
      if (!anchors) return;
      anchors.forEach((anchor) => {
        const href = anchor.getAttribute('href');
        // return if has target or is external link
        if (anchor.getAttribute('target') || !href) return;
        const hrefUrl = new URL(href, window.location.origin);
        const hrefSearchParams = new URLSearchParams(hrefUrl.search);
        // const hrefSeason = hrefSearchParams.get('season');
        let finalHref = hrefUrl;
        finalHref = hrefUrl;
        hrefSearchParams.set('season', season ?? '2024');
        finalHref.search = hrefSearchParams.toString();
        anchor.setAttribute('href', finalHref.toString());
      });
    };
    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
    // For the season change
    handleMutation();
  }, [season, dataSet]);
  return null;
};

export default ModifyLinks;
