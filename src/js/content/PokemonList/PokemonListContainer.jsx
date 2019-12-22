import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import PokemonList from './PokemonList';
import LoadingView from '../../components/LoadingView';

import * as PokemonStateAction from '../../stores/actions/pokemonStateAction';

const mapStateToProps = (state) => {
    return {
        appState: state.appState,
        pokemonState: state.pokemonState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pokemonStateAction: bindActionCreators(PokemonStateAction, dispatch)
    }
}

const PokemonListContainer = (props) => {
    const [fetching, setFetching] = useState(true);

    const url = useMemo(() => `${props.appState.pokemonUrl}?offset=0&limit=1000`, [props.appState.pokemonUrl]);

    useEffect(() => {
        fetchItems();
    }, [url]);

    const fetchItems = async () => {
        const data = await axios.get(url);
        const items = data.data.results;
        props.pokemonStateAction.setPokemons(items);
        setFetching(false);
    }

    return (
        <React.Fragment>
            {
                fetching ?
                    <LoadingView show={true} text={'Fetching data..'} /> :
                    <PokemonList
                        items={props.pokemonState}
                        baseUrl={props.appState.pokemonUrl}
                    />
            }
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonListContainer);