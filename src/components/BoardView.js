import React, { Component } from "react";
import { View, StyleSheet, Text, Animated, Dimensions } from "react-native";

import Tile from "../components/Tile";

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
            emptySlot: 9
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
                    />
                );
            }
        }
        return tiles;
    };

    onPress = tileNumber => {
        let { currentTilesPositions, emptySlot } = this.state;
        var newCurrentTilesPositions = Object.assign({}, currentTilesPositions);
        var tmp = 0;
        switch (currentTilesPositions[tileNumber]) {
        case emptySlot + 3:
        case emptySlot - 3:
        case emptySlot + 1:
        case emptySlot - 1:
            tmp = newCurrentTilesPositions[tileNumber];
            newCurrentTilesPositions[tileNumber] = emptySlot;
            emptySlot = tmp;
            break;
        }

        let check = this.isWinner(newCurrentTilesPositions);
        this.setState({
            currentTilesPositions: newCurrentTilesPositions,
            emptySlot
        });
        if(check)
            this.win();
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
        console.tron.log('win');
    }

    render() {
        return <View style={styles.container}>{this.renderTiles()}</View>;
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
