import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import ListForm from '../components/ListForm';

import { removeList } from '../actions/lists';


export default class EditList extends React.Component {

    state = {
        title: '',
        error: '',
        id: ''
    }

    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        const title = this.props.navigation.getParam('title');
        this.setState({ id, title, loaded: true });

    };

    saveList = () => {
        this.props.navigation.navigate('Main');
    };

    removeList = () => {
        removeList(this.state.id);
        this.props.navigation.navigate('Main');
    };

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
                    <ListForm saveList={this.saveList} id={this.state.id} removeList={this.removeList} />
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
