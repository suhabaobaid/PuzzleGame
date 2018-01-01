/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import GameScreen from './screens/GameScreen';


export default class App extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <GameScreen/>
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
