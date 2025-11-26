import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Footer/Layout';

import ServedBy from '@site/src/components/ServedByComponent';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): ReactNode {
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">
        <div className="footer__top">
          {logo && <div className="footer__brand">{logo}</div>}
          {links && <div className="footer__links-wrap">{links}</div>}
        </div>
        {(logo || copyright) && (
          <div className="footer__bottom text--center footer__bottom-inline">
            {copyright}
            <ServedBy />
          </div>
        )}
      </div>
    </footer>
  );
}
