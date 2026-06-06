import { Adsense } from '@/components/shared/client-adsense';

export const ADSENSE_CLIENT = 'ca-pub-5665711413000284';

export const INLINE_AD_SLOTS = {
  first: '7303713943',
  repeat: '4141567825',
};

/** Same cadence as pitchpredictionswebsite: after 3rd item, then every 8. */
export function getInlineAdVariant(index, total) {
  if (total <= 1 || index === total - 1) return null;
  if (index === 2) return 'first';
  if (index !== 2 && (index - 2) % 8 === 0) return 'repeat';
  return null;
}

export function InlineAdsense({ variant = 'first' }) {
  const slot = variant === 'first' ? INLINE_AD_SLOTS.first : INLINE_AD_SLOTS.repeat;

  return (
    <div className="desktop-container-resize inline-ad-wrap">
      <div className="text-center">
        <Adsense
          client={ADSENSE_CLIENT}
          slot={slot}
          style={{ display: 'block' }}
          layout="in-article"
          format="fluid"
        />
      </div>
    </div>
  );
}
