import React from 'react';
import PropTypes from 'prop-types';

import '../../../styles/components/ListView.scss';

const ListViewLayout = (props) => {
    return (
        <div className={`list-view-layout ${props.orientation}`} style={props.customStyle}>
            {props.children}
        </div>
    )
}

const ORIENTATION = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
}

ListViewLayout.Orientation = ORIENTATION;

ListViewLayout.propTypes = {
    orientation: PropTypes.string,
    customStyle: PropTypes.object
}

ListViewLayout.defaultProps = {
    orientation: ORIENTATION.VERTICAL
}

export default ListViewLayout;