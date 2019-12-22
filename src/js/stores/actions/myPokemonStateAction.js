import * as ActionType from '../../constants/actionType';

export function addMyPokemon(pokemonID, name) {
    const pokemon = {
        ID: pokemonID,
        name: name,
        count: 1
    }
    return ({ type: ActionType.ADD_MYPOKEMON, pokemon });
}