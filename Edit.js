import React, {useState} from 'react';
import {Alert, View, Button, Text, TextInput} from 'react-native';
import { useSafeAreaInsets  } from 'react-native-safe-area-context';
import {datasource} from './Data';

const Edit = ({navigation, route}) => {
    const insets = useSafeAreaInsets();

    const [letter, setLetter] = useState(route.params.key);
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

    const setData = async (value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    };

    getData();

    return (
        <View style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
            <Text>Letter:</Text>
            <TextInput value={letter} maxLength={1} style={{borderWidth: 1}} onChangeText={(text) => setLetter(text)}/>
            <View style={{flexDirection: "row"}}>
                <View style={{margin: 10, flex: 1}}>
                    <Button title='Save'
                            onPress={() => {
                                let indexnum = 1
                                if (route.params.type == "Vowels") {
                                    indexnum = 0;
                                }
                                datasource[indexnum].data[route.params.index].key = letter;
                                navigation.navigate("Home")
                            }
                            }
                    />
                </View>
                <View style={{margin: 10, flex: 1}}>
                    <Button title='Delete'
                            onPress={() => {
                                let indexnum = 1
                                if (route.params.type == "Vowels") {
                                    indexnum = 0;
                                }
                                Alert.alert("Are you sure?", '',
                                    [{
                                        text: 'Yes', onPress: () => {
                                            datasource[indexnum].data.splice(route.params.index, 1);
                                            navigation.navigate("Home")
                                        }
                                    },
                                        {text: 'No'}])
                            }
                            }
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;