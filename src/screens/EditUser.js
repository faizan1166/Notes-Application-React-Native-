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
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

let db = openDatabase({name: 'UserDatabase1.db'});

const EditUser = () => {
  const route = useRoute();
  console.log(route.params.data.isEnabled);
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(route.params.data.description);
  const [isEnabled] = useState(route.params.data.isEnabled);

  const updateUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set title=?, description=? where note_id=?',
        [title, description, route.params.data.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });
  };
  useEffect(() => {
    setTitle(route.params.data.title);
    setDescription(route.params.data.description);
    // setAddress(route.params.data.address);
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
              placeholder="Enter Description"
              numberOfLines={10}
              multiline={true}
              placeholderTextColor="#fff"
              value={description}
              onChangeText={txt => setDescription(txt)}
              style={[
                styles.input,
                {
                  marginTop: 20,
                  backgroundColor: '#212121',
                  height: 250,
                  color: '#fff',
                  textAlignVertical: 'top',
                  paddingTop: 20,
                },
              ]}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                updateUser();
              }}>
              <Text style={styles.btnText}>Save User</Text>
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
                  paddingTop: 20,
                  height: 250,
                },
              ]}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                updateUser();
              }}>
              <Text style={styles.btnText}>Update Note</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default EditUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: responsiveWidth(90),
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
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
