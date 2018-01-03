/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StatusBar, AsyncStorage } from "react-native";
import { Provider } from 'mobx-react';
import stores from './stores';

import MainNavigator from './navigation/MainNavigation';

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content');
    }

    removeData = async() => {
        try {
            await AsyncStorage.removeItem('puzzleHighScore3');
            await AsyncStorage.removeItem('puzzleHighScore4');
        } catch(e) {
            console.tron.log(e);
        }
    }
    prepareStorage = async() => {
        try {
            await AsyncStorage.setItem('puzzleHighScore3', '00:00.00');
            await AsyncStorage.setItem('puzzleHighScore4', '00:00.00');
        } catch (e) {
            console.tron.log(e);
        }
    }

    render() {
        return (
            <Provider {...stores}>
                <MainNavigator />
            </Provider>
        );
    }
}
