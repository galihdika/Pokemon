import React from 'react';
import PropTypes from 'prop-types';
import useClickPreventionOnDoubleClick from '../../lib/clicksHelper';
import { Glyphicon } from 'react-bootstrap';

import '../../../styles/components/ListView.scss';

const ListViewItem = React.memo(React.forwardRef((props, ref) => {
    const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
        () => props.onClick(props.text),
        () => props.onDoubleClick(props.text)
    );

    return (
        <div
            ref={ref}
            className={`list-view-item ${props.isSelected ? 'selected' : 'unselected'} ${props.isDragging ? 'dragging' : ''}`}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <Glyphicon className={'list-view-item-icon'} glyph={props.glyph} bsClass={props.customGlyph} />
            <span>{props.text}</span>
        </div>
    )
}));

ListViewItem.propTypes = {
    text: PropTypes.string,
    glyph: PropTypes.string,
    customGlyph: PropTypes.string,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    isSelected: PropTypes.bool
}

ListViewItem.defaultProps = {
    text: '',
    glyph: 'picture',
    customGlyph: null,
    onClick: () => { },
    onDoubleClick: () => { }
};

export default ListViewItem;