import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';

export default class CustomHeader extends React.Component {
    state = {
        visible: false,
        title: this.props.title
    }

    render() {
        return (
            <View style={styles.header}>
                <Header
                    backgroundColor='#fecc00'
                    centerComponent={{ text: this.props.title, style: styles.headerText }}
                    barStyle={'dark-content'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fecc00',
        // height: 56,
        // marginTop: Platform.OS == "ios" ? 20 : 0
    },
    headerText: {
        color: '#006AA7',
        fontWeight: 'bold',
        fontSize: 20
    }
});
