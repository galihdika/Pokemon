import * as ActionType from '../../constants/actionType';

const initialState = [

]

export default function myPokemonReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.ADD_MYPOKEMON:
            // const pokemonExist = state.find((pokemon) => pokemon.ID === action.pokemon.ID);
            // if (pokemonExist) {
            //     return state.map((pokemon) => {
            //         return pokemon.ID === action.pokemon.ID ?
            //             Object.assign({}, pokemon, { count: pokemon.count + 1 }) :
            //             pokemon
            //     })
            // }
            return state.concat(action.pokemon);
        default:
            return state;
    }
}