import React, {useEffect, useState} from 'react';

const envHost =
  typeof process !== 'undefined' && process.env
    ? process.env.RATIO1_EDGE_ID ??
      process.env.RATIO1_NODE ??
      process.env.HOST_ID ??
      process.env.HOSTNAME ??
      process.env.EE_HOST_ID ??
      process.env.VERCEL_URL ??
      process.env.VERCEL_REGION
    : undefined;
const buildTimeHost = envHost ?? 'unknown';

const buildVersion =
  typeof process !== 'undefined' && process.env
    ? process.env.NEXT_PUBLIC_VERSION_HASH ??
      process.env.BUILD_HASH ??
      process.env.VERCEL_GIT_COMMIT_SHA ??
      process.env.GIT_COMMIT_SHA ??
      process.env.VERSION
    : undefined;

export default function ServedBy(): JSX.Element {
  const [hostId, setHostId] = useState<string>(buildTimeHost);
  const [versionHash] = useState<string>(buildVersion ?? 'unknown');

  useEffect(() => {
    let cancelled = false;

    const setSafe = (value: string) => {
      if (!cancelled && value && value !== hostId) {
        setHostId(value);
      }
    };

    const metaHost =
      document.querySelector('meta[name="server-id"]')?.getAttribute('content') ||
      document.documentElement?.dataset?.hostId;
    if (metaHost) {
      setSafe(metaHost);
    }

    const fetchHeader = async () => {
      try {
        const resp = await fetch(window.location.pathname || '/', {
          method: 'HEAD',
          cache: 'no-store',
        });
        const headerVal =
          resp.headers.get('x-vercel-id') ??
          resp.headers.get('x-ratio1-id') ??
          resp.headers.get('x-edge-id') ??
          resp.headers.get('x-server-id') ??
          resp.headers.get('server');
        if (headerVal) {
          setSafe(headerVal);
          return;
        }
      } catch {
        // ignore
      }

      try {
        const resp = await fetch(window.location.pathname || '/', {
          method: 'GET',
          cache: 'no-store',
        });
        const headerVal =
          resp.headers.get('x-vercel-id') ??
          resp.headers.get('x-ratio1-id') ??
          resp.headers.get('x-edge-id') ??
          resp.headers.get('x-server-id') ??
          resp.headers.get('server');
        if (headerVal) {
          setSafe(headerVal);
          return;
        }
      } catch {
        // ignore
      }

      const fallbackHost = window.location.host || window.location.hostname;
      setSafe(fallbackHost);
    };

    fetchHeader();

    return () => {
      cancelled = true;
    };
  }, [hostId]);

  return (
    <div className="footer__served-by">
      <span className="footer__served-by-label">Ratio1 Edge node serving</span>
      <span className="footer__served-by-id">{hostId}</span>
      <span className="footer__served-by-version">
        <span className="footer__served-by-pill">
          v.<span className="footer__served-by-version-value">{versionHash}</span>
        </span>
      </span>
    </div>
  );
}
