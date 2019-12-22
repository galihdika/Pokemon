import React from 'react';
import PropTypes from 'prop-types';

import TilesViewLayout from '../../components/TilesView/TilesViewLayout';
import MyPokemonListItem from './MyPokemonListItem';

const MyPokemonList = (props) => {
    return (
        <TilesViewLayout>
            {
                props.items.map((item) => (
                    <MyPokemonListItem
                        key={item.ID}
                        itemId={item.ID}
                        name={item.name}
                        baseUrl={props.baseUrl}
                    />
                ))
            }
        </TilesViewLayout>
    )
}

MyPokemonList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
}

export default MyPokemonList;