import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
let db = openDatabase({name: 'UserDatabase1.db'});
const AddUser = ({route}) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEnabled] = useState(route.params.isEnabled);

  console.log(route.params.isEnabled);
  const saveUser = () => {
    console.log(title, description);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (title, description) VALUES (?,?)',
        [title, description],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Note added successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
        error => {
          console.log(error);
        },
      );
    });
  };
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(note_id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(20), description VARCHAR(100))',
              [],
            );
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  }, []);
  return (
    <>
      {isEnabled ? (
        <>
          <StatusBar backgroundColor="#181818" />
          <View style={{...styles.container, backgroundColor: '#181818'}}>
            <TextInput
              placeholder="Enter Title"
              placeholderTextColor="#fff"
              style={{
                ...styles.input,
                backgroundColor: '#212121',
                color: '#fff',
              }}
              value={title}
              onChangeText={txt => setTitle(txt)}
            />
            <TextInput
              numberOfLines={10}
              multiline={true}
              placeholder="Enter Description"
              placeholderTextColor="#fff"
              value={description}
              onChangeText={txt => setDescription(txt)}
              style={[
                styles.input,
                {marginTop: 20},
                {
                  backgroundColor: '#212121',
                  color: '#fff',
                  height: 250,
                  textAlignVertical: 'top',
                  paddingTop: 20,
                },
              ]}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                saveUser();
              }}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <StatusBar backgroundColor="orange" />
          <View style={styles.container}>
            <TextInput
              placeholder="Enter Title"
              style={{...styles.input, backgroundColor: '#daeff7'}}
              value={title}
              onChangeText={txt => setTitle(txt)}
            />
            <TextInput
              placeholder="Enter Description"
              numberOfLines={10}
              multiline={true}
              value={description}
              onChangeText={txt => setDescription(txt)}
              style={[
                styles.input,
                {
                  marginTop: 20,
                  backgroundColor: '#daeff7',
                  textAlignVertical: 'top',
                  height: 250,
                  paddingTop: 20,
                },
              ]}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                saveUser();
              }}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default AddUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: responsiveWidth(90),
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    boxShadow: 10,
    alignSelf: 'center',
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(15),
  },
  addBtn: {
    backgroundColor: 'green',
    width: responsiveWidth(45),
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
});
