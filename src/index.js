import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/content/App';
import * as serviceWorker from './serviceWorker';
import configureStore from "./js/stores/configure-store";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";

import en_US from './localization/en.json';
import de_DE from './localization/de.json';

const store = configureStore();
const messages = {
    'en': en_US,
    'de': de_DE
};

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={'en'} messages={messages['en']}>
            <App />
        </IntlProvider>
    </Provider >,
    document.getElementById('root'));
if (module.hot) {
    module.hot.accept('./js/content/App', () => {
        ReactDOM.render(
            <Provider store={store}>
                <IntlProvider locale={'en'} messages={messages['en']}>
                    <App />
                </IntlProvider>
            </Provider>,
            document.getElementById('root'));
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
