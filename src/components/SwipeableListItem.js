import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swipeable from 'react-native-swipeable';

import CustListItem from './CustListItem';
import { updateItem, removeItem } from '../actions/lists';

export default class ListItem extends React.Component {
    state = {
        visible: false,
        leftActionActivated: false,
        done: false,
        toggle: false
    }

    saveItem = (newText) => {
        updateItem(this.props.listid, this.props.itemid, newText);
        this.setState({ visible: false });
    };

    removeItem = () => {
        removeItem(this.props.listid, this.props.itemid);
    };

    render() {
        return (
            <Swipeable
                style={styles.textInput}
                leftActionActivationDistance={125}
                leftContent={
                    this.state.leftActionActivated ?
                        (
                            <View style={[styles.leftSwipeItem, { backgroundColor: 'red' }]}>
                                <Text>Removing</Text>
                            </View>
                        ) :
                        (
                            <View><Text>About to remove</Text></View>
                        )
                }
                onLeftActionActivate={() => this.setState({ leftActionActivated: true })}
                onLeftActionDeactivate={() => this.setState({ leftActionActivated: false })}
                onLeftActionComplete={this.removeItem}
            >
                <CustListItem
                    {...this.props}
                    saveItem={this.saveItem}
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
    leftSwipeItem: {
        flex: 1,
        width: '90%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    }
});