import React from 'react';
import NavbarLogo from '@theme/Navbar/Logo';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import clsx from 'clsx';

export default function NavbarMobileSidebarHeader(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <div className="navbar-sidebar__brand mobile-sidebar-header">
      <div className="mobile-sidebar-header__left">
        <NavbarLogo />
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
