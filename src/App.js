/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StatusBar } from "react-native";

import MainNavigator from './navigation/MainNavigation';


export default class App extends Component<{}> {

    componentDidMount() {
        StatusBar.setBarStyle('light-content');
    }

    render() {
        return (
            <MainNavigator/>
        );
    }
}
