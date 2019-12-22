import React from 'react';
import { Link } from 'react-router-dom';

import HeaderLayout from '../components/Header/HeaderLayout';
import HeaderMenu from '../components/Header/HeaderMenu';

const AppHeader = (props) => {
    return (
        <HeaderLayout>
            <Link to={'/'}>
                <HeaderMenu name={'Home'} />
            </Link>
            <Link to={'/mypokemon'}>
                <HeaderMenu name={'My Pokemon'} />
            </Link>
        </HeaderLayout>
    )
}

export default AppHeader;