import React from 'react';
import NavbarLogo from '@theme/Navbar/Logo';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import clsx from 'clsx';

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

export default function NavbarMobileSidebarHeader(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const iconItems = items.filter(
    (item) => typeof item.className === 'string' && item.className.includes('navbar__icon-button'),
  );

  return (
    <div className="navbar-sidebar__brand mobile-sidebar-header">
      <div className="mobile-sidebar-header__left">
        <NavbarLogo />
        {iconItems.length > 0 && (
          <div className="mobile-sidebar-header__icons">
            {iconItems.map((item, idx) => (
              <a
                key={idx}
                className={clsx('navbar__item', item.className)}
                href={item.href}
                aria-label={item['aria-label'] ?? 'Navigation link'}
                onClick={() => mobileSidebar.toggle()}
              >
                <span
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{__html: (item as any).html ?? ''}}
                />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="mobile-sidebar-header__actions">
        <NavbarColorModeToggle className="margin-right--sm" />
        <button
          type="button"
          aria-label="Close navigation bar"
          className={clsx('clean-btn', 'navbar-sidebar__close')}
          onClick={() => mobileSidebar.toggle()}>
          <IconClose color="var(--ifm-color-emphasis-600)" />
        </button>
      </div>
    </div>
  );
}
