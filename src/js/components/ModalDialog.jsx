import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap'
import '../../styles/components/ModalDialog.scss';

class ModalDialog extends Component {
    componentDidUpdate() {

    }

    render() {
        const {
            btnAction,
            show,
            header,
            content,
            backdrop,
            onClose,
            isValid,
            className,
            closeDisabled,
            footerContent } = this.props;
        var btn = null;
        const backdropcon = backdrop !== null ? backdrop : true;
        var action = [];
        for (let iACtion = 0; iACtion < btnAction.length; iACtion++) {
            btn = btnAction[iACtion];
            if (btn.style === 'primary') {
                action.push(
                    <Button
                        disabled={btn.disabled || !isValid}
                        key={iACtion}
                        className='modal-btn-primary'
                        onClick={btn.handlerClick}>
                        {btn.text}
                    </Button>
                );
            } else {
                action.push(
                    <Button
                        disabled={btn.disabled}
                        key={iACtion}
                        className='modal-btn-secondary'
                        onClick={btn.handlerClick}>
                        {btn.text}
                    </Button>
                );
            }
        }
        return (
            <div>
                <Modal className={className}
                    backdrop={backdropcon} keyboard={false} show={show} onHide={onClose}>
                    <Modal.Header closeButton={!closeDisabled}>
                        <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>{content}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        {footerContent}
                        {action}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

ModalDialog.propTypes = {
    show: PropTypes.bool,
    header: PropTypes.string,
    content: PropTypes.any,
    backdrop: PropTypes.any,
    btnAction: PropTypes.array,
    onClose: PropTypes.any,
    isValid: PropTypes.bool,
    className: PropTypes.string,
    closeDisabled: PropTypes.bool
};

ModalDialog.defaultProps = {
    show: false,
    header: '',
    content: null,
    btnAction: [],
    onClose: () => { },
    isValid: false,
    className: null,
    closeDisabled: false
}

export default ModalDialog;