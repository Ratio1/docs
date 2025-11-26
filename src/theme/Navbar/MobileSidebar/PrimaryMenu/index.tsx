import React, {type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

export default function NavbarMobilePrimaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const filtered = items.filter(
    (item) => !(typeof item.className === 'string' && item.className.includes('navbar__icon-button')),
  );

  return (
    <ul className="menu__list">
      {filtered.map((item, i) => (
        <NavbarItem
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={i}
        />
      ))}
    </ul>
  );
}
