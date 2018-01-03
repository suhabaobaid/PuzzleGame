import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet, AsyncStorage } from 'react-native';

class MenuScreen extends Component {

    static propTypes = {
        navigation: PropTypes.any.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            highScore: ''
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData () {
        try {
            const value3 = await AsyncStorage.getItem('puzzleHighScore3');
            const value4 = await AsyncStorage.getItem('puzzleHighScore4');
            if (value3 !== null && value4 !== null){
                // We have data!!
                this.setState({
                    highScore3: value3,
                    highScore4: value4
                });
            }
        } catch (error) {
            console.tron.log(error);
            this.getData();
        }
    }

    onChosenGame = (gameType) => {
        this.props.navigation.navigate('Game', {type: gameType});
    };

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.typeButton} onPress={() => this.onChosenGame(3)}>
                    <Text style={styles.text}>8 Puzzle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.typeButton} onPress={() => this.onChosenGame(4)}>
                    <Text style={styles.text}>15 Puzzle</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#22242d',
        paddingVertical: 100
    },
    typeButton: {
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        opacity: 0.7,
        borderRadius: 10,
        marginBottom: 20
    },
    text: {
        fontSize: 25,
        opacity: 1,
        backgroundColor: "transparent"
    }
});

export default MenuScreen;
