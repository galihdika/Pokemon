import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/LoadingView.scss';

const LoadingView = React.memo((props) => (
    <div className={`loading-view ${props.show ? 'show' : 'hide'} ${props.mode}`}>
        <div className={'lds-roller'}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={'loading-text'}>
            {props.text}
        </div>
    </div>
));

export default LoadingView;

LoadingView.propTypes = {
    text: PropTypes.string,
    show: PropTypes.bool,
    mode: PropTypes.oneOf([
        'FullScreen',
        'Contained'
    ])
};

LoadingView.defaultProps = {
    text: 'System is loading ...',
    show: false,
    mode: 'FullScreen'
};