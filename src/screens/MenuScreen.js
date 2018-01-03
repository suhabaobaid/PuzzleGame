import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    AsyncStorage,
    Animated
} from "react-native";

import { metrics } from "../config/BoardConfig";

class MenuScreen extends Component {
    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            highScore3: "",
            highScore4: ""
        };
        this.animated3 = new Animated.Value(0);
        this.animated4 = new Animated.Value(0);
        this.animatedScore = new Animated.Value(0);
    }

    componentDidMount() {
        this.getData();
        this.animate();
    }

    componentWillReceiveProps(props) {
        console.tron.log(props);
    }

    animate = () => {
        Animated.stagger(200, [
            Animated.spring(this.animated4, {
                toValue: 1,
                duration: 250,
                friction: 5
            }),
            Animated.spring(this.animated3, {
                toValue: 1,
                duration: 250,
                friction: 5
            }),
            Animated.spring(this.animatedScore, {
                toValue: 1,
                duration: 250,
                friction: 5
            })
        ]).start();
    };

    getData = async() => {
        try {
            const value3 = await AsyncStorage.getItem("puzzleHighScore3");
            const value4 = await AsyncStorage.getItem("puzzleHighScore4");
            this.setState({
                highScore3: value3 ? value3 : 'None',
                highScore4: value4 ? value4 : 'None'
            });
        } catch (error) {
            console.tron.log(error);
        }
    }

    onChosenGame = gameType => {
        this.props.navigation.navigate("Game", { type: gameType });
    };

    render() {

        const { highScore3, highScore4 } = this.state;

        let position3 = this.animated3.interpolate({
            inputRange: [0, 1],
            outputRange: [-Math.floor(metrics.width * 0.8), Math.floor(metrics.width * 0.1)]
        });

        let position4 = this.animated4.interpolate({
            inputRange: [0, 1],
            outputRange: [-Math.floor(metrics.width * 0.8), Math.floor(metrics.width * 0.1)]
        });

        let positionScore = this.animatedScore.interpolate({
            inputRange: [0, 1],
            outputRange: [Math.floor(metrics.height) + 100, Math.floor(metrics.height * 0.75)]
        });

        return (
            <View style={styles.container}>
                <Animated.View
                    style={[styles.buttonView,
                        {
                            position: "absolute",
                            top: Math.floor(metrics.height * 0.5),
                            left: position3
                        }
                    ]}
                >
                    <TouchableOpacity
                        style={styles.typeButton}
                        onPress={() => this.onChosenGame(3)}
                    >
                        <Text style={styles.text}>3X3 Puzzle</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={[styles.buttonView,
                        {
                            position: "absolute",
                            top: Math.floor(metrics.height * 0.6),
                            left: position4
                        }
                    ]}
                >
                    <TouchableOpacity
                        style={styles.typeButton}
                        onPress={() => this.onChosenGame(4)}
                    >
                        <Text style={styles.text}>4X4 Puzzle</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{
                    position: 'absolute',
                    top: positionScore,
                    left: Math.floor(metrics.width * 0.1)
                }}>
                    <Text style={styles.highscoresLable}>Your highest scores are:</Text>
                    <View style={styles.scoreBoard}>
                        <Text style={[styles.scoreLabel, {marginBottom: 10}]}>{'3X3 Puzzle game: ........ '}
                            <Text style={highScore3 === 'None' ? styles.noScore : styles.score}>{highScore3}</Text>
                        </Text>
                        <Text style={styles.scoreLabel}>{'4X4 Puzzle game: ........ '}
                            <Text style={highScore4 === 'None' ? styles.noScore : styles.score}>{highScore4}</Text>
                        </Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#22242d",
        paddingVertical: 100
    },
    typeButton: {
        width: metrics.width * 0.8,
        height: metrics.height * 0.07,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 30,
        opacity: 1
    },
    buttonView: {},
    text: {
        fontSize: metrics.height * 0.04,
        opacity: 1,
        backgroundColor: "transparent",
        color: "#1bd2d4"
    },
    highscoresLable: {
        color: '#FFF',
        fontSize: metrics.height * 0.04,
        alignSelf: 'center'
    },
    scoreBoard: {
        width: metrics.width * 0.8,
        height: metrics.height * 0.075,
        justifyContent: "center",
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    scoreLabel: {
        fontSize: metrics.height * 0.025,
        backgroundColor: 'transparent',
        color: '#1bd2d4'
    },
    score: {
        fontSize: metrics.height * 0.025,
        backgroundColor: 'transparent',
        color: '#12a4b5'
    },
    noScore: {
        fontSize: metrics.height * 0.025,
        backgroundColor: 'transparent',
        color: '#b1b3e0'
    }
});

export default MenuScreen;
