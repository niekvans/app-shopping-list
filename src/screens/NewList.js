import React from 'react';
import { View } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import ListForm from '../components/ListForm';

import { removeList } from '../actions/lists';

export default class NewList extends React.Component {

    state = {
        error: ''
    }

    saveList = () => {
        this.props.navigation.navigate('Main');
    }

    cancel = (listid) => {
        removeList(listid);
        this.props.navigation.navigate('Main');
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CustomHeader
                    title='Create a new list'
                />
                <ListForm saveList={this.saveList} cancel={this.cancel} />
            </View>
        )
    }
}
