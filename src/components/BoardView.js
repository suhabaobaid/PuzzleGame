import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Animated, Dimensions } from 'react-native';

import Tile from './Tile';
import Notification from './Notification';

var { width, height } = Dimensions.get('window');
var SIZE = 3;
var CELL_SIZE = Math.floor(width * 0.2); //20% of the screen width
var CELL_PADDING = Math.floor(CELL_SIZE * 0.05); //5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 2;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
var LETTER_SIZE = Math.floor(TILE_SIZE * 0.75);
var COUNT = 0;

class BoardView extends Component {

    static propTypes = {
        navigation: PropTypes.any.isRequired,
        isWin: PropTypes.bool.isRequired,
        setWin: PropTypes.func.isRequired,
        onPlayagainPress: PropTypes.func.isRequired,
        positions: PropTypes.any,
        initialTilesPosition: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.INITIAL_STATE = {
            positions: this.props.positions,
            currentTilesPositions: this.props.initialTilesPosition,
            emptySlot: SIZE * SIZE ,
            totalTiles: SIZE * SIZE,
            allTilesHaveRendered: false,
            tileWidths: {},
            isGameStarted: false,
            showNotification: false
        };
        this.state = this.INITIAL_STATE;
    }

    componentDidMount() {
        COUNT = 0;
    }

    componentWillReceiveProps() {
    }

    renderTiles = () => {
        let { currentTilesPositions, positions } = this.state;
        var tiles = [];
        if (this.state.positions) {
            for (var i = 0; i < SIZE * SIZE - 1; i++) {
                tiles.push(
                    <Tile
                        key={i + 1}
                        tileNumber={i + 1}
                        tileStyle={styles.tile}
                        textStyle={styles.letter}
                        onPress={this.onTilePress}
                        currentTilesPositions={currentTilesPositions}
                        positions={positions}
                        onRender={this.onTileRender}
                    />
                );
            }
        }
        return tiles;
    };

    onTileRender = (tileNumber, layoutWidth) => {
        const { tileWidths, totalTiles } = this.state;

        const allTilesHaveRendered = tileWidths
        && Object.keys(tileWidths).length >= totalTiles - 2;

        if (allTilesHaveRendered) {
            this.rearrangeTiles(SIZE * SIZE - 1);
        }

        this.setState(prevState => ({
            tileWidths: {
                // keep all existing widths added previously
                ...prevState.tileWidths,
                // keep the index for calculating scrolling position for each day
                [tileNumber]: layoutWidth
            }
        }));
    }

    async rearrangeTiles (number) {
        let that = this;
        if(COUNT < SIZE * SIZE * SIZE) {
            await setTimeout(function() {
                that.onTilePress(number);
                var flag = false;
                while(!flag) {
                    let { emptySlot, currentTilesPositions } = that.state;
                    let availableTiles = [emptySlot + 1, emptySlot - 1, emptySlot + SIZE, emptySlot - SIZE];
                    let randomNumber = that.generateRandomNumber();
                    if (availableTiles[randomNumber] > 0 && availableTiles[randomNumber] < SIZE * SIZE + 1 ) { //picked a tile within the limit
                        var selectedTile = null;
                        for (const tile in currentTilesPositions) { // get the key at the selectedPosition
                            if(parseInt(currentTilesPositions[tile]) === parseInt(availableTiles[randomNumber])) {
                                selectedTile = tile;
                                break;
                            }
                        }
                        flag = true;
                        COUNT++;
                        that.rearrangeTiles(parseInt(selectedTile));
                    }
                }
            }, 200);
        }
        else {
            this.setState({ isGameStarted: true });
        }
    }

    generateRandomNumber = () => {
        return Math.floor(Math.random() * 4);
    }

    onTilePress = tileNumber => {
        let { currentTilesPositions, emptySlot } = this.state;
        var newCurrentTilesPositions = Object.assign({}, currentTilesPositions);
        var tmp = 0;
        if(parseInt(currentTilesPositions[tileNumber]) % SIZE === 0) {
            switch (parseInt(currentTilesPositions[tileNumber])) {
            case emptySlot + SIZE:
            case emptySlot - SIZE:
            case emptySlot + 1:
                tmp = newCurrentTilesPositions[tileNumber];
                newCurrentTilesPositions[tileNumber] = emptySlot;
                emptySlot = tmp;
                break;
            }
        }
        else if(parseInt(currentTilesPositions[tileNumber]) % SIZE === 1) {
            switch (parseInt(currentTilesPositions[tileNumber])) {
            case emptySlot + SIZE:
            case emptySlot - SIZE:
            case emptySlot - 1:
                tmp = newCurrentTilesPositions[tileNumber];
                newCurrentTilesPositions[tileNumber] = emptySlot;
                emptySlot = tmp;
                break;
            }
        }
        else {
            switch (parseInt(currentTilesPositions[tileNumber])) {
            case emptySlot + SIZE:
            case emptySlot - SIZE:
            case emptySlot + 1:
            case emptySlot - 1:
                tmp = newCurrentTilesPositions[tileNumber];
                newCurrentTilesPositions[tileNumber] = emptySlot;
                emptySlot = tmp;
                break;
            }
        }

        let check = this.isWinner(newCurrentTilesPositions);
        this.setState({
            currentTilesPositions: newCurrentTilesPositions,
            emptySlot
        }, () => {
            if(check && this.state.isGameStarted)
                this.onWin();
        });

        return true;
    };

    isWinner = (tilesPositions) => {
        var keys = Object.keys(tilesPositions);
        var flag = true;
        keys.forEach((key) => {
            if (parseInt(tilesPositions[key]) !== parseInt(key)) {
                flag = false;
            }
        });
        return flag;
    }

    onWin = () => {
        this.setState({
            showNotification: true,
            isGameStarted: false
        }, () => {
            this.props.setWin(true);
        });
    }

    onPlayagainPress = () => {
        COUNT = 0;
        this.setState({
            showNotification: false
        }, () => {
            this.props.onPlayagainPress();
            this.rearrangeTiles(8);
        });
    }

    onExitPressed = () => {
        this.setState(this.INITIAL_STATE, () => {
            this.props.navigation.goBack();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Notification
                    isVisible={this.state.showNotification}
                    animationIn={'zoomIn'}
                    durationIn={250}
                    animationOut={'zoomOut'}
                    durationOut={100}
                    onPlayagainPress={this.onPlayagainPress}
                    onExitPressed={this.onExitPressed}
                />
                {
                    this.renderTiles()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: CELL_SIZE * SIZE,
        height: CELL_SIZE * SIZE,
        backgroundColor: "transparent"
    },
    tile: {
        position: "absolute",
        width: TILE_SIZE,
        height: TILE_SIZE,
        borderRadius: BORDER_RADIUS,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        opacity: 0.7
    },
    letter: {
        fontSize: LETTER_SIZE,
        opacity: 1,
        backgroundColor: "transparent"
    }
});

export default BoardView;
