import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Animated, TouchableOpacity } from "react-native";

class Tile extends Component {
    static propTypes = {
        tileStyle: PropTypes.any,
        textStyle: PropTypes.any,
        onPress: PropTypes.func,
        tileNumber: PropTypes.number
    };

    render() {
        let { tileStyle, textStyle, onPress, tileNumber, position } = this.props;
        return (
            <TouchableOpacity onPress={() => onPress(tileNumber)}>
                <Animated.View style={[tileStyle, {
                    top: position.top,
                    left: position.left
                }]}>
                    <Text style={textStyle}>1</Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

export default Tile;
