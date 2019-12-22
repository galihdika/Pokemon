import { combineReducers } from 'redux';

import appState from './appState';
import pokemonState from './pokemonState';
import myPokemonState from './myPokemonState';

const rootReducer = combineReducers({
    appState,
    pokemonState,
    myPokemonState
});

export default rootReducer;