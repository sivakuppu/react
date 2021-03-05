import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button, TextInput, Text, FlatList, View, StyleSheet } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            city: '',
            data: []
        };
    }

    onLogin() {
        this.saveUser();
    }

    saveUser = async () => {
        try {
            let user = {
                name: this.state.name,
                email: this.state.email,
                city: this.state.city,
            };
            this.setState({name:'', email: '', city: ''});
            let users = await AsyncStorage.getItem('users') || '[]';
            users = JSON.parse(users);
            users.push(user);
            AsyncStorage.setItem('users', JSON.stringify(users)).then(() => {
            });
            this.getUsers();
        }
        catch (error) {
            alert(error);
        }
    }

    getUsers = async () => {
        try {
            AsyncStorage.getItem('users').then(data => {
                this.setState({ data: JSON.parse(data) })
            });
        } catch (error) {
            alert(error);
        }
    }

    componentDidMount(){
        this.getUsers();
    }

    renderItem({ item, index }) {
        return (
            <View style={{ padding: '10px', width: '100%', borderBottom:  '1px solid #C8C8C8' }}>
                <Text style={styles.item} >
                    Name : {item.name}
                </Text>
                <Text style={styles.item} >
                    Email : {item.email}
                </Text>
                <Text style={styles.item} >
                    City : {item.city}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Registration Form</Text>
                <TextInput
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    placeholder={'Name'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'Email'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.city}
                    onChangeText={(city) => this.setState({ city })}
                    placeholder={'City'}
                    style={styles.input}
                />

                <Button
                    title={'Add'}
                    style={styles.input}
                    onPress={this.onLogin.bind(this)}
                />


                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 10
    },
});
