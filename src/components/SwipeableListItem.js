import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swipeable from 'react-native-swipeable';

import CustListItem from './CustListItem';

export default class ListItem extends React.Component {
    state = {
        visible: false,
        leftActionActivated: false,
        done: false,
        toggle: false
    }

    saveItem = () => {
        this.setState({ visible: false });
        this.props.saveText(this.state.text);
    }

    switchDoneState = () => {
        this.setState((prevState) => ({
            done: !prevState.done
        }));
    }

    render() {
        return (
            <Swipeable
                style={styles.textInput}
                leftActionActivationDistance={125}
                leftContent={(
                    <View style={[styles.leftSwipeItem, { backgroundColor: 'red' }]}>
                        <Text>Removing</Text>
                    </View>
                )}
                rightContent={(
                    <View style={[styles.rightSwipeItem]}>
                    </View>
                )}
                onLeftActionActivate={() => this.setState({ leftActionActivated: true })}
                onLeftActionDeactivate={() => this.setState({ leftActionActivated: false })}
                onRightActionRelease={this.switchDoneState}
                onLeftActionComplete={this.props.removeItem}
            >
                <CustListItem
                    {...this.props}
                    done={this.state.done}
                    showDone={true}
                />
            </Swipeable>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: '90%',
        flexDirection: 'row'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    popup: {
        justifyContent: 'space-between',
        backgroundColor: '#fecc00'
    },
    leftSwipeItem: {
        flex: 1,
        width: '90%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    },
    rightSwipeItem: {
        flex: 1,
        // width: '90%',
        // alignItems: 'flex-end',
        justifyContent: 'center',
        // paddingLeft: 20,
        // marginRight: '10%'
    },
});