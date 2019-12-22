import * as ActionType from '../../constants/actionType';

export default function pokemonStateReducer(state = [], action) {
    switch (action.type) {
        case ActionType.SET_POKEMONS:
            return action.pokemons.map((pokemon) => (
                {
                    ID: getItemId(pokemon),
                    name: pokemon.name,
                    isSelected: false,
                    show: true
                }
            ));
        case ActionType.SEARCH_POKEMONS:
            return state.map(pokemon => {
                return pokemon.name.toLowerCase().indexOf(action.keyword.toLowerCase()) !== -1 ? Object.assign({},
                    pokemon, { show: true }) : Object.assign({}, pokemon, { show: false });
            });
        case ActionType.RESTORE_POKEMON_STATE:
            return action.state;
        default:
            return state;
    }
}

const getItemId = (item) => {
    const splittedUrl = item.url.split('/');
    return splittedUrl[splittedUrl.length - 2];
}