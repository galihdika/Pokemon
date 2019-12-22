const initialState = {
    pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/',
    typeUrl: 'https://pokeapi.co/api/v2/type/',
    moveUrl: 'https://pokeapi.co/api/v2/move/'
}

export default function appStateReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}