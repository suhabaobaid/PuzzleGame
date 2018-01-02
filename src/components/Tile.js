import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Animated, TouchableOpacity } from "react-native";

class Tile extends Component {
    static propTypes = {
        tileStyle: PropTypes.any,
        textStyle: PropTypes.any,
        onPress: PropTypes.func,
        tileNumber: PropTypes.number,
        positions: PropTypes.any,
        currentTilesPositions: PropTypes.any,
        onRender: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.currentPosition = {
            left: new Animated.Value(props.positions[props.currentTilesPositions[props.tileNumber]].left),
            top: new Animated.Value(props.positions[props.currentTilesPositions[props.tileNumber]].top)
        };
    }

    onLayout = (event) => {
        this.props.onRender(this.props.tileNumber, event.nativeEvent.layout.width);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.currentTilesPositions[this.props.tileNumber] !== nextProps.currentTilesPositions[this.props.tileNumber]) {
            Animated.parallel(
                [
                    Animated.timing(
                        this.currentPosition.top,
                        {
                            toValue: this.props.positions[nextProps.currentTilesPositions[this.props.tileNumber]].top,
                            duration: 200
                        }
                    ),
                    Animated.timing(
                        this.currentPosition.left,
                        {
                            toValue: this.props.positions[nextProps.currentTilesPositions[this.props.tileNumber]].left,
                            duration: 200
                        }
                    )
                ]
            ).start();
        }
    }

    checkCorrectPosition = () => {
        return (this.props.tileNumber === this.props.currentTilesPositions[this.props.tileNumber]);
    }

    render() {
        let { tileStyle, textStyle, onPress, tileNumber } = this.props;
        let textColor = this.checkCorrectPosition() ? '#1bd2d4' : '#000';
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => onPress(tileNumber, this.currentPosition)}
                onLayout={this.onLayout}
            >
                <Animated.View style={[tileStyle, {
                    top: this.currentPosition.top,
                    left: this.currentPosition.left
                }]}>
                    <Text style={[textStyle, {color: textColor}]}>{tileNumber}</Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

export default Tile;
