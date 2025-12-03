import React, { useState } from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useSafeAreaInsets  } from 'react-native-safe-area-context';
import {datasource} from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const insets = useSafeAreaInsets();

    const [myData, setMyData] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem("alphadata");
        if (datastr != null) {
            let data = JSON.parse(datastr);
            setMyData(data);
        }
        else {
            setMyData(datasource);
        }
    };

    getData();

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
        <View style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
            <StatusBar/>
            <Button title='Add Letter' onPress={() => {
                let datastr = JSON.stringify(myData);
                navigation.navigate("Add", {data: datastr});
            }}/>
            <SectionList sections={myData}
                         renderItem={renderItem}
                         renderSectionHeader={sectionHeader
                         }/>
        </View>
    );
};

export default Home;