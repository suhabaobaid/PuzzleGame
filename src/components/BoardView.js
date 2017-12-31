import React, { Component } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";

import Tile from "../components/Tile";

class BoardView extends Component {

    constructor (props) {
        super(props);
        this.animatedValue = new Animated.Value(100);
    }
    onPress = item => {
        Animated.timing(
            this.animatedValue, {
                toValue: 150,
                    duration: 500
            }
        ).start();
    };

    render() {
        var top = 100;
        var left = 40;

        return (
            <View style={styles.container}>
                <Tile
                    tileNumber={1}
                    tileStyle={styles.tile}
                    textStyle={styles.text}
                    onPress={this.onPress}
                    position={{
                        top: this.animatedValue,
                        left: 40
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
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

export default BoardView;
