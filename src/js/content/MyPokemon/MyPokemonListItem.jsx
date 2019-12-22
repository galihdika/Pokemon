import React from 'react';
import PropTypes from 'prop-types';

import PokemonListItem from '../PokemonList/PokemonListItem';

const MyPokemonListItem = React.memo((props) => {
    return (
        <PokemonListItem
            name={props.name}
            itemId={props.itemId}
            baseUrl={props.baseUrl}
        />
    )
})

MyPokemonListItem.propTypes = {
    itemId: PropTypes.any,
    name: PropTypes.string,
    baseUrl: PropTypes.string
}

export default MyPokemonListItem;