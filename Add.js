import React, { useState } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const [moduleCode, setModuleCode] = useState("");
  const [grade, setGrade] = useState("A");

  const setData = async (value) => {
    await AsyncStorage.setItem("gpaData", value);
    navigation.navigate("Home");
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
    >
      <StatusBar />
      <Text style={styles.screenTitle}>Add Module</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Module Code</Text>
        <TextInput
          maxLength={10}
          style={styles.input}
          onChangeText={setModuleCode}
          value={moduleCode}
          placeholder="e.g. C346"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Grade</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={grade}
            onValueChange={(value) => setGrade(value)}
          >
            <Picker.Item label='A' value='A' />
            <Picker.Item label='B' value='B' />
            <Picker.Item label='C' value='C' />
            <Picker.Item label='D' value='D' />
            <Picker.Item label='F' value='F' />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          if (moduleCode === "") {
            return;
          }

          let mydata;

          if (route.params && route.params.data) {
            mydata = JSON.parse(route.params.data);
          } else {
            mydata = [];
          }

          if (mydata.length === 0) {
            mydata = [{
              data: [],
              title: "Modules",
              bgcolor: "skyblue"
            }];
          }

          const item = { key: moduleCode, grade: grade };
          mydata[0].data.push(item);

          let stringdata = JSON.stringify(mydata);
          setData(stringdata);
        }}
      >
        <Text style={styles.submitText}>Save Module</Text>
      </TouchableOpacity>
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#2e86de',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Add;
