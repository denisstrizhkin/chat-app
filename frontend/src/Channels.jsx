import React, { useEffect, useState } from 'react';

import {
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  useNavigate,
  useLocation,
} from "react-router-native";

import {STYLES, API_URL} from './constants';

function Channels() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [ channels, setChannels ] = useState([]);
  const [ errorMsg, setErrorMsg ] = useState('');

  const [ channelName, setChannelName ] = useState('');
  const [ channelId, setChannelId ] = useState('');

  useEffect(() => {
    getChannels();
  }, []);

  const getChannels = async () => {
    try {
      const response = await fetch(API_URL + 'channels', {
        headers: {
          "Authorization": `JWT ${state.jwt}`,
        },
      });

      const data = await response.json();

      console.log(data);
      
      const success = data.success;
      const error = data.error;

      if (success) {
        setChannels(data.channels);

        console.log(channels);
      } else if (error) {
        setErrorMsg(error);
      } else {
        setErrorMsg('Request failed.');
      }
      
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const onCreateChannel = async () => {
      try {
      const response = await fetch(API_URL + 'channels', {
        method: "POST",
        headers: {
          "Authorization": `JWT ${state.jwt}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: channelName,
        })
      });

      const data = await response.json();

      const success = data.success;
      const error = data.error;

      if (success) {
        getChannels();
      } else if (error) {
        setErrorMsg(error);
      } else {
        setErrorMsg('Request failed.');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const onJoinChannel = async () => {
    try {
      const response = await fetch(API_URL + `channels/join/${channelId}`, {
        method: "POST",
        headers: {
          "Authorization": `JWT ${state.jwt}`,
        },
      });

      const data = await response.json();

      const success = data.success;
      const error = data.error;

      if (success) {
        getChannels();
      } else if (error) {
        setErrorMsg(error);
      } else {
        setErrorMsg('Request failed.');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const onSelectChannel = (id) => {
    navigate("/messages", { state: {
      jwt: state.jwt,
      channel: id,
    }});
  }
  
  return (
    <View style={STYLES.container}>
      <FlatList
        style={STYLES.list}
        data={channels}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={STYLES.channel}
              onPress={() => onSelectChannel(item.id)}
            >
              <Text style={STYLES.channelText}>{item.name}</Text> 
              <Text style={STYLES.channelText}>{item.id}</Text> 
            </TouchableOpacity> 
          );
        }}
        keyExtractor={channel => channel.id}
      />
      <Text style={STYLES.errorText}>{errorMsg}</Text>

      <View style={STYLES.input}>
        <TextInput
          style={STYLES.inputText}
          placeholder="Channel Name"
          onChangeText={(name) => setChannelName(name)}
        /> 
      </View>
      <TouchableOpacity
        style={STYLES.btn2}
        onPress={() => onCreateChannel()}
      >
        <Text style={STYLES.btnText}>Create</Text> 
      </TouchableOpacity> 

      <View style={STYLES.input}>
        <TextInput
          style={STYLES.inputText}
          placeholder="Channel Id"
          onChangeText={(id) => setChannelId(id)}
        /> 
      </View>
      <TouchableOpacity
        style={STYLES.btn2}
        onPress={() => onJoinChannel()}
      >
        <Text style={STYLES.btnText}>Join</Text> 
      </TouchableOpacity> 

    </View>
  );
}

export default Channels;
