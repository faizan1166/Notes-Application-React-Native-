import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
import {responsiveWidth} from 'react-native-responsive-dimensions';
let db = openDatabase({name: 'UserDatabase1.db'});

const FullView = ({route}) => {
  const navigation = useNavigation();
  const [isEnabled] = useState(route.params.isEnabled);

  let deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where note_id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Note deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    navigation.navigate('Home');
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };
  return (
    <>
      {isEnabled ? (
        <>
          <StatusBar backgroundColor="#212121" />
          <View style={{...styles.container, backgroundColor: '#212121'}}>
            <ScrollView>
              <View style={{...styles.container, backgroundColor: '#212121'}}>
                <TouchableOpacity
                  style={{...styles.userItem, backgroundColor: '#181818'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'orange', fontWeight: '600'}}>
                      Title:{' '}
                    </Text>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: '#fff',
                        flexWrap: 'wrap',
                        flex: 1,
                      }}>
                      {route.params.items.title}
                    </Text>
                  </View>
                  <View
                    style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
                    <Text
                      style={{
                        color: 'orange',
                        fontWeight: '600',
                        flexWrap: 'wrap',
                      }}>
                      Description:{' '}
                    </Text>
                    <Text style={{...styles.itemText, color: '#fff'}}>
                      {route.params.items.description}
                    </Text>
                  </View>

                  <View
                    style={{...styles.belowView, backgroundColor: '#212121'}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('EditUser', {
                          data: {
                            title: route.params.items.title,
                            description: route.params.items.description,
                            id: route.params.items.note_id,
                            isEnabled: isEnabled,
                          },
                        });
                      }}>
                      <Image
                        source={require('../images/edit1.png')}
                        style={styles.icons}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        deleteUser(route.params.items.note_id);
                      }}>
                      <Image
                        source={require('../images/delete.png')}
                        style={styles.icons}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </>
      ) : (
        <>
          <StatusBar backgroundColor="orange" />
          <View style={{...styles.container}}>
            <View
              style={{
                alignItems: 'flex-end',
                marginRight: responsiveWidth(8),
                marginTop: 15,
                marginBottom: 10,
              }}></View>
            <ScrollView>
              <View style={{...styles.container}}>
                <TouchableOpacity style={{...styles.userItem}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'orange', fontWeight: '600'}}>
                      Title:{' '}
                    </Text>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: 'black',
                        flexWrap: 'wrap',
                        flex: 1,
                      }}>
                      {route.params.items.title}
                    </Text>
                  </View>

                  <View
                    style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
                    <Text
                      style={{
                        color: 'orange',
                        fontWeight: '600',
                        flexWrap: 'wrap',
                      }}>
                      Description:{' '}
                    </Text>
                    <Text style={{...styles.itemText, color: '#000'}}>
                      {route.params.items.description}
                    </Text>
                  </View>

                  <View
                    style={{...styles.belowView, backgroundColor: '#cededa'}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('EditUser', {
                          data: {
                            title: route.params.items.title,
                            description: route.params.items.description,
                            id: route.params.items.note_id,
                            isEnabled: isEnabled,
                          },
                        });
                      }}>
                      <Image
                        source={require('../images/edit1.png')}
                        style={styles.icons}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        deleteUser(route.params.items.note_id);
                      }}>
                      <Image
                        source={require('../images/delete.png')}
                        style={styles.icons}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
};

export default FullView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  addNewBtn: {
    backgroundColor: 'orange',
    width: '10%',
    height: '6%',
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
  },
  userItem: {
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    elevation: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  itemText: {
    fontSize: 15,
    color: '#000',
  },
  belowView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#cededa',
    borderRadius: 10,
    height: 50,
  },
  icons: {
    width: 24,
    height: 24,
  },
});
