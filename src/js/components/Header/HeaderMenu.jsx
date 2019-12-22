import React from 'react';
import PropTypes from 'prop-types';

import '../../../styles/components/Header.scss';

const HeaderMenu = React.memo((props) => {
    return (
        <div className={'header-menu'}>
            {props.name}
        </div>
    )
})

HeaderMenu.propTypes = {
    name: PropTypes.string
}

export default HeaderMenu;