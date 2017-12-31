import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import BoardView from "../components/BoardView";

class GameScreen extends Component {
    render() {
        return (
            <BoardView/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#22242d"
    },
    tile: {
        width: 100,
        height: 100,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        opacity: 0.7
    },
    text: {
        color: "#000",
        fontSize: 80,
        opacity: 1
    }
});

export default GameScreen;
