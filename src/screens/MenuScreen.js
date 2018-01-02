import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

class MenuScreen extends Component {

    static propTypes = {
        navigation: PropTypes.any.isRequired
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
