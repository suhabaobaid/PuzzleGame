import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';

import BoardView from "../components/BoardView";

var { width, height } = Dimensions.get('window');
var SIZE = 3;
var CELL_SIZE = Math.floor(width * 0.2); //20% of the screen width
var CELL_PADDING = Math.floor(CELL_SIZE * 0.05); //5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 2;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
var LETTER_SIZE = Math.floor(TILE_SIZE * 0.75);

class GameScreen extends Component {

    static propTypes = {
        navigation: PropTypes.any.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            isWin: false,
            positions: this.getPositions(),
            initialTilesPosition: this.getInitialPositions()
        };
    }

    getPositions = () => {
        var positions = {};
        var initialTilesPosition = {};
        for (var row = 0; row < SIZE; row++) {
            for (var col = 0; col < SIZE; col++) {
                var key = row * SIZE + col;
                // var letter = index;
                var position = {
                    left: col * CELL_SIZE + CELL_PADDING,
                    top: row * CELL_SIZE + CELL_PADDING
                };
                positions[key + 1] = position;
                if((key + 1) !== SIZE * SIZE)
                    initialTilesPosition[key + 1] = key + 1;
            }
        }

        return positions;
    }

    getInitialPositions = () => {
        var initialTilesPosition = {};
        for (var row = 0; row < SIZE; row++) {
            for (var col = 0; col < SIZE; col++) {
                var key = row * SIZE + col;
                if((key + 1) !== SIZE * SIZE)
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

    render() {
        const { isWin, initialTilesPosition, positions } = this.state;
        return (
            <View style={styles.container}>
                <BoardView navigation={this.props.navigation} isWin={isWin} setWin={this.setWin}
                    onPlayagainPress={this.onPlayagainPress} initialTilesPosition={initialTilesPosition}
                    positions={positions}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22242d'
    }
});

export default GameScreen;
