import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { observer, inject } from "mobx-react";

import BoardView from "../components/BoardView";

@inject("gameStore")
@observer
class GameScreen extends Component {

    static propTypes = {
        navigation: PropTypes.any.isRequired,
        gameStore: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.boardConfig = this.getConfig(props.navigation.state.params.type);
        this.state = {
            isWin: false,
            positions: this.getPositions(),
            initialTilesPosition: this.getInitialPositions()
        };
    }

    getConfig = (type) => {
        var { width } = Dimensions.get('window');
        var SIZE = parseInt(type);
        var CELL_SIZE = Math.floor(width * 0.2); //20% of the screen width
        var CELL_PADDING = Math.floor(CELL_SIZE * 0.05); //5% of the cell size
        var BORDER_RADIUS = CELL_PADDING * 2;
        var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
        var LETTER_SIZE = Math.floor(TILE_SIZE * 0.75);

        return {
            SIZE,
            CELL_SIZE,
            CELL_PADDING,
            BORDER_RADIUS,
            TILE_SIZE,
            LETTER_SIZE
        };
    }

    getPositions = () => {
        var positions = {};
        var initialTilesPosition = {};
        for (var row = 0; row < this.boardConfig.SIZE; row++) {
            for (var col = 0; col < this.boardConfig.SIZE; col++) {
                var key = row * this.boardConfig.SIZE + col;
                // var letter = index;
                var position = {
                    left: col * this.boardConfig.CELL_SIZE + this.boardConfig.CELL_PADDING,
                    top: row * this.boardConfig.CELL_SIZE + this.boardConfig.CELL_PADDING
                };
                positions[key + 1] = position;
                if((key + 1) !== this.boardConfig.SIZE * this.boardConfig.SIZE)
                    initialTilesPosition[key + 1] = key + 1;
            }
        }

        return positions;
    }

    getInitialPositions = () => {
        var initialTilesPosition = {};
        for (var row = 0; row < this.boardConfig.SIZE; row++) {
            for (var col = 0; col < this.boardConfig.SIZE; col++) {
                var key = row * this.boardConfig.SIZE + col;
                if((key + 1) !== this.boardConfig.SIZE * this.boardConfig.SIZE)
                    initialTilesPosition[key + 1] = key + 1;
            }
        }

        return initialTilesPosition;
    }

    setWin = (winStatus) => {
        this.setState({
            isWin: winStatus
        });
    }

    onPlayagainPress = () => {
        this.setState({
            isWin: false
        });
    }

    saveData = async (currentValue) => {

        //get the type of the game
        let type = this.props.navigation.state.params.type;
        try {
            // parse the retrieved data
            const retrievedValue = await AsyncStorage.getItem('puzzleHighScore' + type);

            if(retrievedValue !== null) { //there is an earlier saved score
                const ret_m_sec = retrievedValue.split(':');
                const ret_sec_ms = ret_m_sec[1].split('.');

                // parse the current data
                const curr_m_sec = currentValue.split(':');
                const curr_sec_ms = curr_m_sec[1].split('.');

                //check if the retrieved value is better than the current one
                if(parseInt(curr_m_sec[0]) < parseInt(ret_m_sec[0])) {
                    await AsyncStorage.setItem('puzzleHighScore' + type, currentValue);
                    this.props.gameStore.updateScore(type, currentValue);
                }
                else if (parseInt(curr_m_sec[0]) === parseInt(ret_m_sec[0])) {
                    if(parseInt(curr_sec_ms[0]) < parseInt(ret_sec_ms[0])) {
                        await AsyncStorage.setItem('puzzleHighScore' + type, currentValue);
                        this.props.gameStore.updateScore(type, currentValue);
                    }
                    else if (parseInt(curr_sec_ms[0]) === parseInt(ret_sec_ms[0])) {
                        if(parseInt(curr_sec_ms[1]) < parseInt(ret_sec_ms[1])) {
                            await AsyncStorage.setItem('puzzleHighScore' + type, currentValue);
                            this.props.gameStore.updateScore(type, currentValue);
                        }
                    }
                }
            } else { //no previous storage
                await AsyncStorage.setItem('puzzleHighScore' + type, currentValue);
                this.props.gameStore.updateScore(type, currentValue);
            }

        } catch (error) {
            //if no value saved before
            console.tron.log('In the get async storage, GameScreen. Message: ' + error);
        }
    }

    render() {
        const { isWin, initialTilesPosition, positions } = this.state;
        return (
            <View style={styles.container}>
                <BoardView navigation={this.props.navigation} isWin={isWin} setWin={this.setWin}
                    onPlayagainPress={this.onPlayagainPress} initialTilesPosition={initialTilesPosition}
                    positions={positions} boardConfig={this.boardConfig} saveData={this.saveData}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#22242d'
    }
});

export default GameScreen;
