import React, {useEffect, useState} from 'react';

const envHost =
  typeof process !== 'undefined' && process.env
    ? process.env.HOST_ID ?? process.env.HOSTNAME ?? process.env.EE_HOST_ID
    : undefined;
const buildTimeHost = envHost ?? 'local';

export default function ServedBy(): JSX.Element {
  const [hostId, setHostId] = useState<string>(buildTimeHost);

  useEffect(() => {
    const detectedHost =
      document
        .querySelector('meta[name="server-id"]')
        ?.getAttribute('content') ||
      document.documentElement?.dataset?.hostId ||
      window.location.host ||
      window.location.hostname;

    if (detectedHost && detectedHost !== hostId) {
      setHostId(detectedHost);
    }
  }, [hostId]);

  return (
    <div className="footer__served-by">
      <span className="footer__served-by-label">Ratio1 Edge node serving</span>
      <span className="footer__served-by-id">{hostId}</span>
    </div>
  );
}
