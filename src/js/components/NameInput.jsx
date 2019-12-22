import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/NameInput.scss';

const NameInput = React.memo((props) => {
    const [name, setName] = useState(props.initialName);

    const handleOnChange = (evt) => {
        const newName = evt.target.value;
        setName(newName);
        props.onChange(newName);
    }

    const handleOnFocus = (evt) => {
        evt.target.select();
    }

    return (
        <div className={'content-name-input'}>
            <div className={'label-row'}>
                <label className={'input-label'}>
                    {props.label}
                </label>
            </div>
            <input
                type={'text'}
                className={'content-name-input'}
                autoFocus={true}
                value={name}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
            />
        </div>
    )
})

NameInput.propTypes = {
    label: PropTypes.string,
    initialName: PropTypes.string,
    onChange: PropTypes.func
}

export default NameInput;