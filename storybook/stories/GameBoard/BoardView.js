import React, { Component } from "react";
import { View, StyleSheet, Text, Animated, Dimensions } from "react-native";
import { action } from "@storybook/addon-actions";

import Tile from "./Tile";

var { width, height } = Dimensions.get("window");
var SIZE = 3;
var CELL_SIZE = Math.floor(width * 0.2); //20% of the screen width
var CELL_PADDING = Math.floor(CELL_SIZE * 0.05); //5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 2;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
var LETTER_SIZE = Math.floor(TILE_SIZE * 0.75);

class BoardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: null,
            currentTilesPositions: null,
            emptySlot: 9,
            totalTiles: SIZE * SIZE,
            allTilesHaveRendered: false,
            tileWidths: {},
            isGameStarted: false
        };
    }

    componentDidMount() {
        this.getPositions();
    }

    getPositions = () => {
        var positions = {};
        var currentTilesPositions = {};
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
                    currentTilesPositions[key + 1] = key + 1;
            }
        }
        this.setState(
            {
                positions,
                currentTilesPositions
            },
            () => this.renderTiles()
        );
    };

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
                        onPress={this.onPress}
                        currentTilesPositions={currentTilesPositions}
                        positions={positions}
                        onRender={this.onTileRender}
                        doAnimation={this.doAnimation}
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
            this.rearrangeTiles();
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

    onPress = tileNumber => {
        action("Clicked tile");
        let { currentTilesPositions, emptySlot } = this.state;
        var newCurrentTilesPositions = Object.assign({}, currentTilesPositions);
        var tmp = 0;
        if(parseInt(currentTilesPositions[tileNumber]) % 3 === 0) {
            switch (parseInt(currentTilesPositions[tileNumber])) {
            case emptySlot + 3:
            case emptySlot - 3:
            case emptySlot + 1:
                tmp = newCurrentTilesPositions[tileNumber];
                newCurrentTilesPositions[tileNumber] = emptySlot;
                emptySlot = tmp;
                break;
            }
        }
        else if(parseInt(currentTilesPositions[tileNumber]) % 3 === 1) {
            switch (parseInt(currentTilesPositions[tileNumber])) {
            case emptySlot + 3:
            case emptySlot - 3:
            case emptySlot - 1:
                tmp = newCurrentTilesPositions[tileNumber];
                newCurrentTilesPositions[tileNumber] = emptySlot;
                emptySlot = tmp;
                break;
            }
        }
        else {
            switch (parseInt(currentTilesPositions[tileNumber])) {
            case emptySlot + 3:
            case emptySlot - 3:
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
        });
        if(check && this.state.isGameStarted)
            this.win();

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

    win = () => {
        //console.tron.log('win');
    }

    async rearrangeTiles () {
        await this.onPress(8);

        for(var i = 0; i < 50; i++) {
            let { emptySlot, currentTilesPositions } = this.state;
            let availableTiles = [emptySlot + 1, emptySlot - 1, emptySlot + 3, emptySlot - 3];
            let randomNumber = this.generateRandomNumber();
            // console.tron.log(emptySlot);
            // console.tron.log(availableTiles[randomNumber]);
            if (availableTiles[randomNumber] > 0 && availableTiles[randomNumber] < 10 ) { //picked a tile within the limit
                var selectedTile = null;
                for (const tile in currentTilesPositions) { // get the key at the selectedPosition
                    if(parseInt(currentTilesPositions[tile]) === parseInt(availableTiles[randomNumber])) {
                        selectedTile = tile;
                        break;
                    }
                }
                // setTimeout(() => {this.onPress(parseInt(selectedTile));}, 250);
                let result = await this.onPress(parseInt(selectedTile));
                setTimeout(() => {console.log(result);}, 5000);
            }
        }
        this.setState({ isGameStarted: true });
    }

    generateRandomNumber = () => {
        return Math.floor(Math.random() * 4);
    }

    render() {
        return (
            <View style={styles.container}>
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
        opacity: 0.9
    },
    letter: {
        fontSize: LETTER_SIZE,
        opacity: 1,
        backgroundColor: "transparent"
    }
});

export default BoardView;
