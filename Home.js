import React from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {datasource} from './Data';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'impact'
    },
});

const Home = ({navigation}) => {

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.opacityStyle}
                              onPress={() => {
                                  navigation.navigate("Edit", {index: index, type: section.title, key: item.key})
                              }
                              }
            >
                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        );
    };

    const sectionHeader = ({section: {title, bgcolor}}) => {
        return (
            <Text style={[styles.headerText, {backgroundColor: bgcolor}]}>
                {title}
            </Text>
        );
    };
    return (
        <View>
            <StatusBar/>
            <Button title='Add Letter' onPress={() => {
                navigation.navigate("Add")
            }}/>
            <SectionList sections={datasource}
                         renderItem={renderItem}
                         renderSectionHeader={sectionHeader
                         }/>
        </View>
    );
};

export default Home;