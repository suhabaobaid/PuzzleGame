import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import BoardView from "../components/BoardView";

class GameScreen extends Component {

    static propTypes = {
        navigation: PropTypes.any.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            isWin: true
        };
    }

    setWin = (winStatus) => {
        this.setState({
            isWin: winStatus
        });
    }

    onPlayagainPress = () => {
        this.setState({
            isWin: false
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <BoardView navigation={this.props.navigation} isWin={this.state.isWin} setWin={this.setWin}
                    onPlayagainPress={this.onPlayagainPress}
                />
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
