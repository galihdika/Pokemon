import React from 'react';
import PropTypes from 'prop-types';

import '../../../styles/components/TilesView.scss';

const TilesViewLayout = (props) => {
    return (
        <div className={`tiles-view-layout ${props.orientation}`} style={props.customStyle}>
            {props.children}
        </div>
    )
}

const ORIENTATION = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
}

TilesViewLayout.Orientation = ORIENTATION;

TilesViewLayout.propTypes = {
    orientation: PropTypes.string,
    customStyle: PropTypes.object
}

TilesViewLayout.defaultProps = {
    orientation: ORIENTATION.HORIZONTAL
}

export default TilesViewLayout;