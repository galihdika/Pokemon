import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MyPokemonList from './MyPokemonList';

const mapStateToProps = (state) => {
    return {
        appState: state.appState,
        myPokemonState: state.myPokemonState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const MyPokemonListContainer = (props) => {
    return (
        <MyPokemonList
            items={props.myPokemonState}
            baseUrl={props.appState.pokemonUrl}
        />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemonListContainer);