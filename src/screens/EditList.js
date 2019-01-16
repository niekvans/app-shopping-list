import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import ListForm from '../components/ListForm';

import { startEditList, startRemoveList } from '../actions/lists';


export default class EditList extends React.Component {

    state = {
        title: '',
        items: [],
        newItem: '',
        error: '',
        loaded: false,
        id: ''
    }

    async componentDidMount() {
        const id = this.props.navigation.getParam('id');
        const title = this.props.navigation.getParam('title');
        const items = this.props.navigation.getParam('items') || [];
        this.setState({
            id,
            title,
            items,
            loaded: true
        });
    }

    saveList = (title, items) => {
        startEditList({ id: this.state.id, title, items }).then(() => {
            this.props.navigation.navigate('Main');
        })
    }

    removeList = () => {
        startRemoveList(this.state.id).then(() => {
            this.props.navigation.navigate('Main');
        });
    }

    cancel = () => {
        this.props.navigation.navigate('Main');
    }

    editTitle = (title) => {
        this.setState({
            title
        });
    }

    render() {
        if (this.state.loaded) {
            return (
                <View style={{ flex: 1 }}>
                    <CustomHeader title={"Edit list: " + this.state.title} />
                    {this.state.error ? <Text>{this.state.error}</Text> : undefined}
                    <ListForm saveList={this.saveList} title={this.state.title} items={this.state.items} cancel={this.cancel} id={this.state.id} removeList={this.removeList} />
                </View>
            )
        }
        else {
            return (
                <View>
                    <CustomHeader title="Edit list" />
                    <ActivityIndicator />
                </View>
            )
        }
    }
}
