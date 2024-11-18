import { FC, ReactElement, memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

import styles from './menu.module.scss';

interface IMenu {
  className?: string;
}

const Menu: FC<IMenu> = ({ className }): ReactElement => (
  <nav className={cn(styles.menu, className)}>
    <NavLink
      to={ROUTE_CONSTANTS.HOME}
      end
      className={({ isActive }) =>
        isActive ? cn(styles.item, styles['item-active']) : styles.item
      }
    >{PAGE_NAMES.HOME}</NavLink>

    <NavLink
      to={ROUTE_CONSTANTS.FETCH}
      className={({ isActive }) =>
        isActive ? cn(styles.item, styles['item-active']) : styles.item
      }
    >{PAGE_NAMES.FETCH}</NavLink>

   
  </nav>
);

const memorizedMenu = memo(Menu);

export { memorizedMenu as Menu };
