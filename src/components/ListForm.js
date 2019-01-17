import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import { List } from 'react-native-elements';

import CustListItem from './CustListItem';
import SwipeableListItem from './SwipeableListItem';
import database from '../firebase/firebase';
import { databaseSection } from 'react-native-dotenv';

import { createList, pushListItem, updateTitle } from '../actions/lists';

export default class ListForm extends React.Component {

    state = {
        title: '',
        items: [],
        newItem: '',
        error: '',
        refreshing: false,
        id: this.props.id || '',
        loaded: false
    }

    componentDidMount() {
        let listid;
        if (!this.props.id) {
            listid = createList();
            this.setState({
                id: listid
            });
        }
        else {
            listid = this.props.id
        }

        database.ref(`${databaseSection}/${listid}`).on('value', (snapshot) => {
            let newList = [];
            if (snapshot.val()) {
                let items = snapshot.val().items;
                for (let item in items) {
                    newList.push({
                        key: item,
                        text: items[item]
                    });
                }
                this.setState({
                    items: newList,
                    title: snapshot.val().title
                });
            }
            this.setState({ loaded: true });
        });
    };

    componentWillUnmount() {
        database.ref(`${databaseSection}/${this.state.id}`).off();
    }

    addItemToList = (item) => {
        if (item !== '') {
            pushListItem(this.state.id, item);
        }
    };

    cancel = () => {
        this.props.cancel(this.state.id);
    }

    saveList = () => {
        if (this.state.title !== '') {
            const savedList = this.state.newItem ? [...this.state.items, this.state.newItem] : this.state.items;
            this.props.saveList(this.state.title, savedList);
        }
        else {
            this.setState({ error: 'Please enter a title' });
        }
    };

    saveTitle = (title) => {
        updateTitle(this.state.id, title);
    };

    render() {
        if (this.state.loaded) {
            return (
                <View style={styles.container}>
                    <View style={styles.title}>
                        <CustListItem
                            autoCapitalize={'none'}
                            placeholder="Title"
                            saveItem={this.saveTitle}
                            value={this.state.title}
                            label="Title"
                            item={this.state.title}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            title="Save List"
                            onPress={this.saveList}
                            color="#006AA7"
                        />
                        {this.props.removeList ?
                            <Button
                                title="Remove List"
                                onPress={this.props.removeList}
                                color="#006AA7"
                            />
                            :
                            <Button
                                title="Cancel"
                                onPress={this.cancel}
                                color="#006AA7"
                            />
                        }

                    </View>
                    <ScrollView
                        style={styles.scrollView}
                    >
                        <List>
                            {this.state.items.map((item, index) => (
                                <View
                                    style={styles.listItem}
                                    key={index}
                                >
                                    <SwipeableListItem
                                        item={item.text}
                                        itemid={item.key}
                                        listid={this.state.id}
                                    />
                                </View>
                            ))}
                            <View
                                style={styles.listItem}
                            >
                                <CustListItem
                                    placeholder={"New Item"}
                                    saveItem={newItem => this.addItemToList(newItem)}
                                    item={this.state.newItem}
                                    newItem={true}
                                />
                            </View>
                        </List>
                    </ScrollView>
                </View>
            )
        }
        else {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center'
    },
    scrollView: {
        flexGrow: 1,
        marginBottom: 30,
        marginTop: 10
    },
    listItem: {
        // height: 30,
        // width: '90%',
        // marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    },
    title: {
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        fontWeight: 'bold',
        borderColor: 'grey',
        borderWidth: 0.5,
        // width: "70%",
        marginTop: 20,
        fontSize: 30
    },
    buttons: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    error: {
        borderColor: 'red',
        color: 'red',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        fontWeight: 'bold'
    }
})