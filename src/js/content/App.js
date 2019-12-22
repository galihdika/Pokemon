import React from "react";
import { hot, setConfig } from 'react-hot-loader'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from './AppHeader';
import PokemonListContainer from './PokemonList/PokemonListContainer';
import PokemonDetailContainer from './PokemonDetail/PokemonDetailContainer';
import MyPokemonListContainer from './MyPokemon/MyPokemonListContainer';

import '../../styles/modules/App.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        setConfig({
            // set this flag to support SFC if patch is not landed
            pureSFC: true
        });
    }

    render() {
        return (
            <div className={'app'}>
                <Router>
                    <AppHeader />
                    <Switch>
                        <Route path={'/'} exact component={PokemonListContainer} />
                        <Route path={'/pokemon/:id'} component={PokemonDetailContainer} />
                        <Route path={'/mypokemon'} component={MyPokemonListContainer} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default process.env.NODE_ENV === "development" ? hot(module)(connect(null, null)(App)) : connect(null, null)(App);