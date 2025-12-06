import React, { useState, useEffect } from 'react';
import { StatusBar, SectionList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { datasource } from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
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

  useEffect(() => {
    getData();
  }, []);

  const calculateGPA = () => {
    if (myData.length === 0 || myData[0].data.length === 0) {
      Alert.alert("No modules", "Please add at least one module.");
      return;
    }

    const modules = myData[0].data;
    let totalPoints = 0;

    modules.forEach(item => {
      if (item.grade === "A") totalPoints += 4;
      if (item.grade === "B") totalPoints += 3;
      if (item.grade === "C") totalPoints += 2;
      if (item.grade === "D") totalPoints += 1;
      if (item.grade === "F") totalPoints += 0;
    });

    const gpa = totalPoints / modules.length;
    Alert.alert("GPA Summary", `Your GPA is: ${gpa.toFixed(2)}`);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.moduleCard}
        onPress={() => {
          navigation.navigate("Edit", {
            index: index,
            code: item.key,
            grade: item.grade,
          });
        }}
      >
        <Text style={styles.moduleCode}>{item.key}</Text>
        <View style={styles.gradeBadge}>
          <Text style={styles.gradeText}>{item.grade}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const sectionHeader = ({ section: { title, bgcolor } }) => {
    return (
      <View style={[styles.sectionHeader, { backgroundColor: bgcolor }]}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
    >
      <StatusBar />

      <View style={styles.topBar}>
        <Text style={styles.appTitle}>GPA Calculator</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => {
            let datastr = JSON.stringify(myData);
            navigation.navigate("Add", { data: datastr });
          }}
        >
          <Text style={styles.buttonText}>Add Module</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={calculateGPA}
        >
          <Text style={styles.buttonText}>Calculate CPA</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={myData}
        renderItem={renderItem}
        renderSectionHeader={sectionHeader}
        keyExtractor={(item, index) => item.key + index}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
    paddingHorizontal: 16,
  },
  topBar: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',          // FLEXBOX: row layout
    justifyContent: 'space-between',
    gap: 8,                        // if gap not supported, spacing comes from marginRight below
    marginBottom: 12,
  },
  button: {
    flex: 1,                       // FLEXBOX: buttons share space
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: '#2e86de',
  },
  secondaryButton: {
    backgroundColor: '#10ac84',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 16,
  },
  sectionHeader: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 8,
    borderRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  moduleCard: {
    flexDirection: 'row',          // FLEXBOX: code + grade on same row
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcdde1',
  },
  moduleCode: {
    fontSize: 16,
  },
  gradeBadge: {
    backgroundColor: '#f1c40f',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gradeText: {
    fontWeight: 'bold',
  },
});

export default Home;
