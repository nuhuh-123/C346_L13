import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { datasource } from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const [moduleCode, setModuleCode] = useState(route.params.code);
  const [grade, setGrade] = useState(route.params.grade);
  const [myData, setMyData] = useState([]);

  const getData = async () => {
    let datastr = await AsyncStorage.getItem("gpaData");
    if (datastr != null) {
      let data = JSON.parse(datastr);
      setMyData(data);
    } else {
      setMyData(datasource);
    }
  };

  const setData = async (value) => {
    await AsyncStorage.setItem("gpaData", value);
    navigation.navigate("Home");
  };

  useEffect(() => {
    getData();
  }, []);

  const saveModule = () => {
    if (myData.length === 0) {
      return;
    }

    let updated = [...myData];
    updated[0].data[route.params.index] = {
      key: moduleCode,
      grade: grade,
    };

    const datastr = JSON.stringify(updated);
    setData(datastr);
  };

  const deleteModule = () => {
    if (myData.length === 0) {
      return;
    }

    Alert.alert(
      "Are you sure?",
      "",
      [
        {
          text: 'Yes',
          onPress: () => {
            let updated = [...myData];
            updated[0].data.splice(route.params.index, 1);
            const datastr = JSON.stringify(updated);
            setData(datastr);
          }
        },
        { text: 'No' }
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
    >
      <Text style={styles.screenTitle}>Edit Module</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Module Code</Text>
        <TextInput
          value={moduleCode}
          maxLength={10}
          style={styles.input}
          onChangeText={setModuleCode}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Grade</Text>
        <TextInput
          value={grade}
          maxLength={1}
          style={styles.input}
          onChangeText={(text) => setGrade(text.toUpperCase())}
          placeholder="A/B/C/D/F"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={saveModule}>
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={deleteModule}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
    paddingHorizontal: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  saveButton: {
    backgroundColor: '#2e86de',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Edit;
