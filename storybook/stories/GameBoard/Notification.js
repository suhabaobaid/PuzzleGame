import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

class Notification extends Component {

    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        animationIn: PropTypes.string.isRequired,
        durationIn: PropTypes.number.isRequired,
        animationOut: PropTypes.string.isRequired,
        durationOut: PropTypes.number.isRequired,
        onPlayagainPress: PropTypes.func.isRequired,
        onExitPressed: PropTypes.func.isRequired,
        timer: PropTypes.string.isRequired
    }

    renderNotificationContent() {
        return (
            <View style={styles.modalContainer}>
                <View style={styles.modalTitleView}>
                    <Text style={styles.modalTitle}>Congratulations</Text>
                </View>
                <View style={styles.modalBody} >
                    <Text>
                        {
                            'You successfuly placed all the tiles in their correct positions. You did it in time '+ this.props.timer
                        }
                    </Text>
                </View>
                <View style={styles.modalFooter}>
                    <TouchableOpacity onPress={this.props.onExitPressed}
                        style={[styles.modalButton, {backgroundColor: '#cecfe5', borderColor: '#000', borderTopWidth: 0.5, borderBottomWidth: 0.5}]}>
                        <Text style={styles.modalButtonLabel}>Exit to Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onPlayagainPress}
                        style={[styles.modalButton, {backgroundColor: '#cee3e5', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]}>
                        <Text style={styles.modalButtonLabel}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        let { isVisible, animationIn, durationIn, animationOut, durationOut} = this.props;
        return (
            <Modal
                animationIn={animationIn}
                animationInTiming={durationIn}
                animationOut={animationOut}
                animationOutTiming={durationOut}
                isVisible={isVisible}
                onBackdropPress={() => null}
            >
                {this.renderNotificationContent()}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#22242d"
    },
    modalContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginVertical: 50,
        marginHorizontal: 30
    },
    modalTitleView: {
        marginVertical: 20,
        alignItems: 'center'
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#22242d'
    },
    modalBody: {
        marginVertical: 20,
        alignItems: 'center',
        marginHorizontal: 20
    },
    modalFooter: {
        marginTop: 20
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    modalButtonLabel: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 18
    }
});

export default Notification;
