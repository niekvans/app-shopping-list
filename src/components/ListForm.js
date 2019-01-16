// Main.js
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-elements';

import CustListItem from './CustListItem';
import SwipeableListItem from './SwipeableListItem';
import database from '../firebase/firebase';
import { databaseSection } from 'react-native-dotenv';

export default class ListForm extends React.Component {

    state = {
        title: this.props.title || '',
        items: this.props.items || [],
        newItem: '',
        error: '',
        refreshing: false,
        id: this.props.id || null
    }

    addItemToList = (item) => {
        if (item !== '') {
            this.setState(prevState => ({
                items: [...prevState.items, item],
                newItem: ''
            }));
        }
    }

    cancel = () => {
        this.props.cancel();
    }

    saveList = () => {
        if (this.state.title !== '') {
            const savedList = this.state.newItem ? [...this.state.items, this.state.newItem] : this.state.items;
            this.props.saveList(this.state.title, savedList);
        }
        else {
            this.setState({ error: 'Please enter a title' });
        }
    }

    _onRefresh = () => {
        if (this.state.id) {
            this.setState({ refreshing: true });
            database.ref(`/${databaseSection}/${this.state.id}`).once('value').then((snapshot) => {
                const list = snapshot.val();
                this.setState({
                    items: list.items || [],
                    title: list.title,
                    error: ''
                });
            }).catch((error) => {
                this.setState({
                    error: 'Problem fetching the data'
                });
            });
            this.setState({ refreshing: false });
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
                        undefined
                    }
                    <Button
                        title="Cancel"
                        onPress={this.cancel}
                        color="#006AA7"
                    />
                </View>

                {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : undefined}
                <View style={styles.title}>
                    <CustListItem
                        autoCapitalize={'none'}
                        placeholder="Title"
                        saveText={title => this.setState({ title, error: '' })}
                        value={this.state.title}
                        label="Title"
                        item={this.state.title}
                    />
                </View>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <List>
                        {this.state.items.map((item, index) => (
                            <View
                                style={styles.listItem}
                                key={index}
                            >
                                <SwipeableListItem
                                    item={item}
                                    saveText={
                                        (text) => this.setState((prevState) => {
                                            const newState = prevState.items.map((item, i) => {
                                                if (i == index) {
                                                    return text;
                                                }
                                                else {
                                                    return item;
                                                }
                                            });
                                            return {
                                                items: newState
                                            }
                                        })}
                                    removeItem={
                                        () => {
                                            this.setState({
                                                items: this.state.items.filter((item, i) => i !== index)
                                            })
                                        }
                                    }
                                />
                            </View>
                        ))}
                        <View
                            style={styles.listItem}
                        >
                            <CustListItem
                                placeholder={"New Item"}
                                saveText={newItem => this.addItemToList(newItem)}
                                item={this.state.newItem}
                                newItem={true}
                            />
                        </View>
                    </List>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
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