import * as ActionType from '../../constants/actionType';

export function setPokemons(pokemons) {
    return ({ type: ActionType.SET_POKEMONS, pokemons });
}

export function searchPokemon(keyword) {
    return ({ type: ActionType.SEARCH_POKEMONS, keyword });
}

export function restorePokemonState(state) {
    return ({ type: ActionType.RESTORE_POKEMON_STATE, state });
}