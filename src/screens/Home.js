import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  StatusBar,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {responsiveWidth} from 'react-native-responsive-dimensions';

let db = openDatabase({name: 'UserDatabase1.db'});

const Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [noteList, setNoteList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setNoteList(temp);
      });
    });
  };

  return (
    <>
      {isEnabled ? (
        <>
          <StatusBar backgroundColor="#212121" />
          <View style={{...styles.container, backgroundColor: '#212121'}}>
            <View
              style={{
                alignItems: 'flex-end',
                marginRight: responsiveWidth(8),
                marginTop: 15,
                marginBottom: 10,
              }}>
              <ToggleSwitch
                leftText={'☀️'}
                rightText={'🌙'}
                size="small"
                isOn={isEnabled}
                onColor="green"
                onValueChange={toggleSwitch}
                onToggle={toggleSwitch}
              />
            </View>
            <FlatList
              data={noteList}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('FullView', {
                        items: item,
                        isEnabled: isEnabled,
                      });
                    }}
                    style={{...styles.userItem, backgroundColor: '#181818'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: 'orange',
                          fontWeight: '600',
                          marginLeft: 10,
                        }}>
                        Title:{' '}
                      </Text>

                      {item.title.length < 30 ? (
                        <Text style={{...styles.itemText, color: '#fff'}}>
                          {item.title}
                        </Text>
                      ) : (
                        <Text style={{...styles.itemText, color: '#fff'}}>
                          {item.title.slice(0, 29)}...
                        </Text>
                      )}
                    </View>
                    <View
                      style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
                      <Text
                        style={{
                          color: 'orange',
                          fontWeight: '600',
                          marginLeft: 10,
                        }}>
                        Description:{' '}
                      </Text>
                      {item.description.length < 100 ? (
                        <Text
                          style={{
                            ...styles.itemText,
                            color: '#fff',
                            marginLeft: 10,
                          }}>
                          {item.description}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            ...styles.itemText,
                            color: '#fff',
                            marginLeft: 10,
                          }}>
                          {item.description.slice(0, 100)}...
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              style={styles.addNewBtn}
              onPress={() => {
                navigation.navigate('AddUser', {isEnabled: isEnabled});
              }}>
              <Text style={styles.btnText}> + </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <StatusBar backgroundColor="orange" />
          <View style={styles.container}>
            <View
              style={{
                alignItems: 'flex-end',
                marginRight: responsiveWidth(8),
                marginTop: 15,
                marginBottom: 10,
              }}>
              <ToggleSwitch
                size="small"
                isOn={isEnabled}
                offColor="black"
                onValueChange={toggleSwitch}
                onToggle={toggleSwitch}
              />
            </View>
            <FlatList
              data={noteList}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.userItem}
                    onPress={() => {
                      navigation.navigate('FullView', {items: item});
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: 'orange',
                          fontWeight: '600',
                          marginLeft: 10,
                        }}>
                        Title:{' '}
                      </Text>
                      {item.title.length < 30 ? (
                        <Text style={styles.itemText}>
                          {item.title.slice(0, 50)}
                        </Text>
                      ) : (
                        <Text style={styles.itemText}>
                          {item.title.slice(0, 35)}...
                        </Text>
                      )}
                    </View>
                    <View
                      style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
                      <Text
                        style={{
                          color: 'orange',
                          fontWeight: '600',
                          marginLeft: 10,
                        }}>
                        Description:{' '}
                      </Text>
                      {item.description.length < 100 ? (
                        <Text
                          style={{
                            ...styles.itemText,
                            color: '#000',
                            marginLeft: 10,
                          }}>
                          {item.description}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            ...styles.itemText,
                            color: '#000',
                            marginLeft: 10,
                          }}>
                          {item.description.slice(0, 100)}...
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              style={styles.addNewBtn}
              onPress={() => {
                navigation.navigate('AddUser', {isEnabled: isEnabled});
              }}>
              <Text style={styles.btnText}> + </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default Home;
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
