import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import useClickPreventionOnDoubleClick from '../../lib/clicksHelper';

import '../../../styles/components/TilesView.scss';

const TilesViewItem = React.memo(React.forwardRef((props, ref) => {
    const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
        (() => props.onClick(props.text)),
        (() => props.onDoubleClick(props.text))
    );

    return (
        <div
            ref={ref}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            className={`card tiles-view-item ${props.isSelected ? 'selected' : ''} ${props.isDragging ? 'dragging' : ''}`}
        >
            <LazyLoad
                placeholder={<Glyphicon className={'tiles-view-item-icon'} glyph={'repeat'} />}
                once
            >
                <img className={'tiles-view-item-icon'} src={props.imageUrl} alt={''} />
                <p className={'card-footer tiles-view-item-name'}>{props.text}</p>
            </LazyLoad>
        </div>
    );
}));

TilesViewItem.propTypes = {
    text: PropTypes.string,
    imageUrl: PropTypes.string,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    isSelected: PropTypes.bool
};

TilesViewItem.defaultProps = {
    text: '',
    onClick: () => { },
    onDoubleClick: () => { }
};

export default TilesViewItem;