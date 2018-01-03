import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import TimeFormatter from 'minutes-seconds-milliseconds';

import Tile from './Tile';
import Notification from './Notification';

var COUNT = 0;
class BoardView extends Component {

    static propTypes = {
        navigation: PropTypes.any.isRequired,
        isWin: PropTypes.bool.isRequired,
        setWin: PropTypes.func.isRequired,
        onPlayagainPress: PropTypes.func.isRequired,
        positions: PropTypes.any,
        initialTilesPosition: PropTypes.any,
        boardConfig: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        let { boardConfig } = props;
        this.INITIAL_STATE = {
            positions: this.props.positions,
            currentTilesPositions: this.props.initialTilesPosition,
            emptySlot: Math.pow(boardConfig.SIZE, 2) ,
            totalTiles: Math.pow(boardConfig.SIZE, 2),
            allTilesHaveRendered: false,
            tileWidths: {},
            isGameStarted: false,
            showNotification: false,
            mainTimer: 0,
            mainTimerStart: null,
            isRunning: false
        };
        this.state = this.INITIAL_STATE;
    }

    componentDidMount() {
        COUNT = 0;
    }

    renderTiles = () => {
        let { currentTilesPositions, positions } = this.state;
        let { boardConfig } = this.props;
        var tiles = [];
        if (this.state.positions) {
            for (var i = 0; i < Math.pow(boardConfig.SIZE, 2) - 1; i++) {
                tiles.push(
                    <Tile
                        key={i + 1}
                        tileNumber={i + 1}
                        tileStyle={[styles.tile, {width: boardConfig.TILE_SIZE, height: boardConfig.TILE_SIZE, borderRadius: boardConfig.BORDER_RADIUS}]}
                        textStyle={[styles.letter, {fontSize: boardConfig.LETTER_SIZE}]}
                        onPress={this.onTilePress}
                        currentTilesPositions={currentTilesPositions}
                        positions={positions}
                        onRender={this.onTileRender}
                        disabled={!this.state.isGameStarted}
                    />
                );
            }
        }
        return tiles;
    };

    onTileRender = (tileNumber, layoutWidth) => {
        const { tileWidths, totalTiles } = this.state;
        let { boardConfig } = this.props;

        const allTilesHaveRendered = tileWidths
        && Object.keys(tileWidths).length >= totalTiles - 2;

        if (allTilesHaveRendered) {
            this.rearrangeTiles(Math.pow(boardConfig.SIZE, 2) - 1);
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

    rearrangeTiles = async (number) => {
        let { boardConfig } = this.props;
        let that = this;
        if(COUNT < 1) {
            await setTimeout(function() {
                that.onTilePress(number);
                var flag = false;
                while(!flag) {
                    let { emptySlot, currentTilesPositions } = that.state;
                    let availableTiles = [emptySlot + 1, emptySlot - 1, emptySlot + boardConfig.SIZE, emptySlot - boardConfig.SIZE];
                    let randomNumber = that.generateRandomNumber();
                    if (availableTiles[randomNumber] > 0 && availableTiles[randomNumber] < Math.pow(boardConfig.SIZE, 2) + 1 ) { //picked a tile within the limit
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
            // Game is starting, buttons are enabled and game is starting
            this.setState({ isGameStarted: true }, () => {
                this.startStopTimer();
            });
        }
    }

    generateRandomNumber = () => {
        return Math.floor(Math.random() * 4);
    }

    startStopTimer = () => {

        let { isRunning, mainTimer } = this.state;

        // Game is finished and timer is stopped
        if(isRunning) {
            clearInterval(this.interval);
            this.setState({
                isRunning: false
            });
            return ;
        }

        //Game just started and set the start of the timers
        this.setState({
            mainTimerStart: Date.now(),
            isRunning: true
        }, () => {
            // update interval
            this.interval = setInterval(() => {
                this.setState({
                    mainTimer: new Date() - this.state.mainTimerStart + mainTimer
                });
            }, 30);
        });
    }

    onTilePress = tileNumber => {
        let { boardConfig } = this.props;
        let { currentTilesPositions, emptySlot } = this.state;
        var newCurrentTilesPositions = Object.assign({}, currentTilesPositions);
        var tmp = 0;
        if(parseInt(currentTilesPositions[tileNumber]) % boardConfig.SIZE === 0) {
            switch (parseInt(currentTilesPositions[tileNumber])) {
            case emptySlot + boardConfig.SIZE:
            case emptySlot - boardConfig.SIZE:
            case emptySlot + 1:
                tmp = newCurrentTilesPositions[tileNumber];
                newCurrentTilesPositions[tileNumber] = emptySlot;
                emptySlot = tmp;
                break;
            }
        }
        else if(parseInt(currentTilesPositions[tileNumber]) % boardConfig.SIZE === 1) {
            switch (parseInt(currentTilesPositions[tileNumber])) {
            case emptySlot + boardConfig.SIZE:
            case emptySlot - boardConfig.SIZE:
            case emptySlot - 1:
                tmp = newCurrentTilesPositions[tileNumber];
                newCurrentTilesPositions[tileNumber] = emptySlot;
                emptySlot = tmp;
                break;
            }
        }
        else {
            switch (parseInt(currentTilesPositions[tileNumber])) {
            case emptySlot + boardConfig.SIZE:
            case emptySlot - boardConfig.SIZE:
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
            if(check && this.state.isGameStarted) {
                this.startStopTimer();
                this.onWin();
            }
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
        setTimeout(() => {
            this.props.saveData(TimeFormatter(this.state.mainTimer));
            this.setState({
                showNotification: true,
                isGameStarted: false
            }, () => {
                this.props.setWin(true);
            });
        }, 200);
    }

    //TODO: Perhaps need to set the state to the initial state
    onPlayagainPress = () => {
        COUNT = 0;
        this.setState({
            showNotification: false,
            isGameStarted: false,
            mainTimer: 0
        }, () => {
            this.props.onPlayagainPress();
            this.rearrangeTiles(Math.pow(this.props.boardConfig.SIZE, 2) - 1);
        });
    }

    onExitPressed = () => {
        this.setState(this.INITIAL_STATE, () => {
            this.props.navigation.goBack();
        });
    }

    render() {
        let { boardConfig } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>
                        { TimeFormatter(this.state.mainTimer) }
                    </Text>
                </View>
                <View style={[styles.boardContainer, {width: boardConfig.CELL_SIZE * boardConfig.SIZE, height: boardConfig.CELL_SIZE * boardConfig.SIZE}]}>
                    <Notification
                        isVisible={this.state.showNotification}
                        animationIn={'zoomIn'}
                        durationIn={300}
                        animationOut={'zoomOut'}
                        durationOut={100}
                        onPlayagainPress={this.onPlayagainPress}
                        onExitPressed={this.onExitPressed}
                        timer={TimeFormatter(this.state.mainTimer)}
                    />
                    {
                        this.renderTiles()
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boardContainer: {
        backgroundColor: "transparent"
    },
    timerContainer: {
        position: 'absolute',
        top: 40,
        left: 20
    },
    tile: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        opacity: 1
    },
    letter: {
        opacity: 1,
        backgroundColor: "transparent"
    },
    timerText: {
        color: '#FFF',
        fontSize: 30
    }
});

export default BoardView;
