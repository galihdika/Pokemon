import React from 'react';

import '../../../styles/components/Header.scss';

const HeaderLayout = (props) => {
    return (
        <div className={'header-container'}>
            <div className={'header-layout'}>
                {props.children}
            </div>
        </div>
    )
}

export default HeaderLayout;