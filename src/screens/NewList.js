import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import ListForm from '../components/ListForm';

import { startAddList } from '../actions/lists';


export default class NewList extends React.Component {

    state = {
        title: '',
        items: [],
        newItem: '',
        error: ''
    }

    saveList = (title, items) => {
        startAddList({
            title: title,
            items: items
        });
        this.props.navigation.navigate('Main');
    }

    cancel = () => {
        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CustomHeader
                    title='Create a new list'
                />
                <ListForm saveList={this.saveList} title={this.state.title} items={this.state.items} cancel={this.cancel} />
            </View>
        )
    }
}
