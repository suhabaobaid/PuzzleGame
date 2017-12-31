/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import GameScreen from './screens/GameScreen';


export default class App extends Component<{}> {
    render() {
        return (
            <GameScreen/>
        );
    }
}

const styles = StyleSheet.create({
});
