import React from 'react';
import PopupDialog, { DialogContent, DialogButton, SlideAnimation } from 'react-native-popup-dialog';
import { StyleSheet, View, TextInput } from 'react-native';

export default class CustListItem extends React.Component {
    state = {
        visible: false,
        text: this.props.item,
        prevText: this.props.item,
        leftActionActivated: false,
        toggle: false
    }

    saveItem = () => {
        const text = this.state.text;
        this.setState({ visible: false });
        if (text !== this.state.prevText) {
            if (this.props.newItem) {
                this.setState({ text: '' });
            }
            else {
                this.setState({ prevText: text });
            }
            this.props.saveItem(text);
        }

    }

    render() {
        return (
            <View
                style={styles.textInput}
            >
                <TextInput
                    autoCapitalize="none"
                    value={this.props.item}
                    onFocus={() => this.setState({ visible: true })}
                    placeholder={this.props.placeholder}
                    style={styles.text}
                />
                <PopupDialog
                    dialogStyle={styles.popupPosition}
                    visible={this.state.visible}
                    onTouchOutside={this.saveItem}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom'
                    })}
                    actions={[
                        <DialogButton
                            key="cancel-button"
                            style={styles.buttons}
                            text="CANCEL"
                            onPress={() => {
                                this.setState({ text: this.props.item, visible: false });
                            }}
                        />,
                        <DialogButton
                            key="ok-button"
                            style={styles.buttons}
                            text="OK"
                            onPress={this.saveItem}
                        />,
                    ]}
                >
                    <DialogContent style={styles.popup}>
                        <TextInput
                            style={styles.textPopup}
                            autoCapitalize="none"
                            value={this.state.text}
                            onChangeText={
                                (text) => this.setState({ text })
                            }
                            autoFocus={true}
                            onSubmitEditing={this.saveItem}
                        />
                    </DialogContent>
                </PopupDialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        flex: 10,
        fontWeight: 'bold'
    },
    textInput: {
        height: 50,
        width: '90%',
        minWidth: 150,
        flexDirection: 'row'
    },
    textPopup: {
        fontSize: 20,
        // flex: 10,
        fontWeight: 'bold',
        height: 50,
        width: '90%',
        minWidth: 150,
        flexDirection: 'row'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fecc00'
    },
    popup: {
        height: 40,
        justifyContent: 'space-between',
        backgroundColor: '#fecc00'
    },
    popupPosition: {
        position: 'absolute',
        top: 200,
        // bottom: 0
    },
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    },
    rightSwipeItem: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    },
});