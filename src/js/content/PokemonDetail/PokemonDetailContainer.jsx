import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import PokemonDetailItem from './PokemonDetailItem';
import LoadingView from '../../components/LoadingView';
import ModalDialog from '../../components/ModalDialog';
import NameInput from '../../components/NameInput';

import * as MyPokemonStateAction from '../../stores/actions/myPokemonStateAction';
import { useState } from 'react';
import { useCallback } from 'react';

const mapStateToProps = (state) => {
    return {
        appState: state.appState,
        myPokemonState: state.myPokemonState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        myPokemonStateAction: bindActionCreators(MyPokemonStateAction, dispatch)
    }
}

const PokemonDetailContainer = (props) => {
    const [fetching, setFetching] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [types, setTypes] = useState([]);
    const [moves, setMoves] = useState([]);

    const [showDialog, setShowDialog] = useState(false);
    const [nickName, setNickName] = useState('My Pokemon');

    const url = useMemo(() => `${props.appState.pokemonUrl}${props.match.params.id}`, [props.appState.pokemonUrl, props.match.params.id]);
    const ownedCount = useMemo(() => props.myPokemonState.filter((pokemon) => pokemon.ID === props.match.params.id).length, [props.myPokemonState.length, props.match.params.id]);

    useEffect(() => {
        fetchItem();
    }, [url]);

    const fetchItem = async () => {
        const data = await axios.get(url);
        const imageUrl = data.data.sprites.front_default
        const types = data.data.types;
        const moves = data.data.moves;
        setImageUrl(imageUrl);
        setTypes(types);
        setMoves(moves);
        setFetching(false);
    }

    const onCatch = useCallback(() => {
        const randNumber = Math.floor(Math.random() * 10);
        if (randNumber % 2 === 0) { //50% probability
            setShowDialog(true);
        }
    });

    const namingInputContent = () => {
        return (
            <NameInput
                label={'Name Your Pokemon'}
                initialName={'My Pokemon'}
                onChange={onPokemonNickNameChange}
            />
        )
    }

    const onPokemonNickNameChange = (name) => {
        debugger;
        setNickName(name);
    };

    const namingInputButtons = () => {
        return [
            {
                text: 'OK',
                style: 'primary',
                handlerClick: () => {
                    onNamingModalClose();
                    onNickNameSet();
                }
            },
            {
                text: 'Cancel',
                style: 'danger',
                handlerClick: () => onNamingModalClose()
            }
        ]
    }

    const onNickNameSet = () => {
        props.myPokemonStateAction.addMyPokemon(props.match.params.id, nickName);
    }

    const onNamingModalClose = useCallback(() => {
        setShowDialog(false);
    }, []);

    return (
        <React.Fragment>
            {
                fetching ?
                    <LoadingView show={true} text={'Fetching data..'} /> :
                    <PokemonDetailItem
                        imgUrl={imageUrl}
                        types={types}
                        moves={moves}
                        ownedCount={ownedCount}
                        onCatch={onCatch}
                    />
            }
            {
                <ModalDialog
                    show={showDialog}
                    content={namingInputContent()}
                    btnAction={namingInputButtons()}
                    header={'You Got Pokemon'}
                    onClose={onNamingModalClose}
                    isValid={true}
                />
            }
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetailContainer);