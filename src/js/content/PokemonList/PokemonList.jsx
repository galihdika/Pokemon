import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TilesViewLayout from '../../components/TilesView/TilesViewLayout';
import PokemonListItem from './PokemonListItem';

const PokemonList = (props) => {
    return (
        <TilesViewLayout>
            {
                props.items.map((item) => (
                    item.show &&
                    <Link key={item.ID} to={`/pokemon/${item.ID}`}>
                        <PokemonListItem
                            key={item.ID}
                            name={item.name}
                            itemId={item.ID}
                            baseUrl={props.baseUrl}
                        />
                    </Link>
                ))
            }
        </TilesViewLayout>
    )
}

PokemonList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
}

export default PokemonList;