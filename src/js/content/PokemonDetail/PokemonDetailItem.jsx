import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import _ from 'lodash';

import '../../../styles/content/Pokemon.scss';

const PokemonDetailItem = React.memo((props) => {
    return (
        <div className={'pokemon-detail-container'}>
            <div className={"pokemon-detail"}>
                <div className={"pokemon-detail-main"}>
                    <div className={"pokemon-detail-main-info"}>
                        <img className={"pokemon-detail-image"} src={props.imgUrl} alt={'Pokemon'} />
                        <ul className={"pokemon-detail-types"}>
                            {
                                props.types.map((item) => (
                                    <li key={item.type.name} className={'pokemon-detail-type-item'}>
                                        {item.type.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={'pokemon-detail-main-action'}>
                        <span>{props.ownedCount}</span>
                        <Button
                            bsStyle={'primary'}
                            bsSize="large"
                            onClick={props.onCatch}
                        >
                            Catch
                        </Button>
                    </div>
                </div>
                <div className={'pokemon-detail-extra'}>
                    <span>Moves: </span>
                    <div className={'pokemon-detail-moves'}>
                        {
                            props.moves.map((item) => (
                                <div key={item.move.name} className={'pokemon-detail-move-item'}>
                                    {item.move.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}, (prevProps, nextProps) => (
    prevProps.imgUrl === nextProps.imgUrl &&
    prevProps.ownedCount === nextProps.ownedCount &&
    prevProps.onCatch === nextProps.onCatch &&
    _.isEqual(prevProps.types, nextProps.types) &&
    _.isEqual(prevProps.moves, nextProps.moves)
))

PokemonDetailItem.propTypes = {
    imgUrl: PropTypes.string,
    ownedCount: PropTypes.number,
    types: PropTypes.array,
    moves: PropTypes.array,
    onCatch: PropTypes.func
}

PokemonDetailItem.defaultProps = {
    ownedCount: 0
}

export default PokemonDetailItem;