import React from 'react';
import classNames from 'classnames';
import { Link } from "@reach/router";

import Container from '../UI/Container';
import css from './Header.sss';

const NavLink = (props) => (
    <Link
      {...props}
      getProps={({ isCurrent }) => ({ className: classNames(css.navLink, { [css.active]: isCurrent })}) }
    />
);

const Header = () => (
    <div className={css.root}>
        <Container>
            <div className={css.content}>
                <Link
                    className={css.logo}
                    to='/'
                >
                    BONY
                </Link>
                <nav className={css.nav}>
                    <NavLink to='/'>
                        Посты
                    </NavLink>
                    <NavLink to='settings'>
                        Настройки
                    </NavLink>
                </nav>
            </div>
        </Container>
    </div>
);

export default Header;