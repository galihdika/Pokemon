import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TilesViewItem from '../../components/TilesView/TilesViewItem';

const PokemonListItem = React.memo(({ name, itemId, baseUrl }) => {
    const [imageUrl, setImageUrl] = useState('');

    const url = useMemo(() => `${baseUrl}${itemId}`, [baseUrl, itemId]);

    useEffect(() => {
        fetchItem();
    }, [url]);

    const fetchItem = async () => {
        const data = await axios.get(url);
        const imageUrl = data.data.sprites.front_default;
        setImageUrl(imageUrl);
    }

    return (
        <TilesViewItem
            text={name}
            imageUrl={imageUrl}
        />
    )
});

PokemonListItem.propTypes = {
    name: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired
}

export default PokemonListItem;