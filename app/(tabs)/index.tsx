import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, } from 'react-native';
import React, {useState} from 'react';
import { Linking } from 'react-native';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({});

  const searchUser = () => {
    fetch(`https://api.github.com/users/${username}`, {
    })
    .then(response => response.json())
    .then(data => setUserData(data))
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Github User Finder</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.search}
          placeholder='input username'
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity style={styles.btn} onPress={searchUser}>
          <Text style={styles.btntext}>Search</Text>
        </TouchableOpacity>
      </View>
      {userData && (
      <View style={styles.result}>
          <View style={styles.resultinfo}>
            <Image
              source={{ uri: userData.avatar_url }}
              style={{ width: 110, height: 110, borderRadius: 200 }}
            />
            <Text style={styles.rtext}>Name: {userData.name}</Text>
            <Text style={styles.rtext}>Bio: {userData.bio}</Text>
            <Text style={styles.rtext}>Repo: {userData.public_repos}</Text>
            <Text style={styles.rtext}>Followers: {userData.followers}</Text>
            <Text style={styles.rtext}>Following: {userData.following}</Text>
            <Text style={styles.rtext}>Location: {userData.location}</Text>
              <TouchableOpacity 
              style={styles.btnprof}
              onPress={() => Linking.openURL(userData.repos_url)}
              >
                <Text style={styles.rtext}>Go to profile</Text>
              </TouchableOpacity>
          </View>
      </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  title:{
    fontSize: 40,
    color: 'white',
  },
  container:{
    backgroundColor: 'black',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  form:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  search:{
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    width: 200,
    borderRadius: 4,
    padding: 7,
  },
  btn:{
    borderWidth: 1,
    borderColor: 'white',
    width: 70,
    borderRadius: 4,
    padding: 11,
  },
  btntext:{
    color: 'white',
    textAlign: 'center',
  },
  rtext:{
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }, 
  result:{
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'white',
    width: 280,
    padding: 20,

  },
  resultinfo:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  btnprof:{
    borderWidth: 1,
    borderColor: 'white',
    width: 140,
    borderRadius: 4,
    padding: 4,
  }
});
