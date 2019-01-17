// Main.js
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import CustomHeader from '../components/CustomHeader';

import { databaseSection } from 'react-native-dotenv';
import database from './../firebase/firebase';

export default class Main extends React.Component {
    state = {
        lists: [],
        loaded: false,
        refreshing: false,
        leftActionActivated: false,
        toggle: false
    }

    loadData = () => {
        database.ref(databaseSection).on('value', (snapshot) => {
            const lists = [];
            snapshot.forEach((childSnapshot) => {
                lists.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            this.setState({ lists: lists, loaded: true, refreshing: false });
        });
    };

    componentDidMount() {
        this.loadData();
    };

    componentWillUnmount() {
        database.ref(databaseSection).off();
    };

    addList = () => {
        this.props.navigation.navigate('NewList')
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.loadData();
    };

    render() {
        if (!this.state.loaded) {
            return (
                <View>
                    <CustomHeader
                        title='Overview of lists'
                    />
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <View>
                    <CustomHeader
                        title='Overview of lists'
                    />
                    <View style={styles.buttons}>
                        <Button
                            title="New List"
                            onPress={this.addList}
                            color="#006AA7"
                        />
                    </View>
                </View>
                <ScrollView
                    style={styles.scrollview}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <List>
                        {this.state.lists.length > 0 ?
                            this.state.lists.map((list) =>
                                <ListItem
                                    key={list.id}
                                    title={list.title}
                                    titleStyle={styles.listItem}
                                    onPress={() => this.props.navigation.navigate('EditList', { id: list.id, title: list.title })}
                                />
                            )
                            :
                            <Text style={styles.text}>No Lists yet</Text>
                        }
                    </List>
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    buttons: {
        width: 100,
        marginTop: 10,
        marginLeft: 10
    },
    listItem: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    scrollview: {
        flexGrow: 1,
        marginBottom: 50
    },
    text: {
        fontSize: 20,
        flex: 10,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10
    }
});