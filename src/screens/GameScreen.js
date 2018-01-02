import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import BoardView from "../components/BoardView";

class GameScreen extends Component {

    static propTypes = {
        navigation: PropTypes.any.isRequired
    }

    render() {
        return (
            <View style={styles.container}>
                <BoardView/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22242d'
    }
});

export default GameScreen;
