import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import {
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

function Messages() { 
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [ messages, setMessages ] = useState([]);
  const [ body, setBody ] = useState('');
  const [ errorMsg, setErrorMsg ] = useState('');

  const onBack = () => {
    navigate("/channels", { state: {
      jwt: state.jwt,
    }});
  };

  const getMessages = async () => {
    try {
      const response = await fetch(API_URL + `channels/messages/${state.channel}`, {
        headers: {
          "Authorization": `JWT ${state.jwt}`,
        },
      });

      const data = await response.json();

      const success = data.success;
      const error = data.error;

      if (success) {
        console.log(data);
        setMessages(data.messages);
        console.log(messages);
      } else if (error) {
        setErrorMsg(error);
      } else {
        setErrorMsg('Request failed.');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  useEffect(() => {
    const interval = setInterval(getMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const onSendMessage = async () => {   
    try {
      const response = await fetch(API_URL + 'channels/messages', {
        method: "POST",
        headers: {
          "Authorization": `JWT ${state.jwt}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          body: body,
          id: String(state.channel),
        })
      });

      const data = await response.json();

      const success = data.success;
      const error = data.error;

      if (success) {
      } else if (error) {
        setErrorMsg(error);
      } else {
        setErrorMsg('Request failed.');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  
  return (
    <View style={STYLES.container}>
      <TouchableOpacity
        style={STYLES.btn2}
        onPress={() => onBack()}
      >
        <Text style={STYLES.btnText}>Back</Text> 
      </TouchableOpacity> 

      <FlatList
        style={STYLES.list}
        data={messages}
        renderItem={({item}) => {
          return (
            <Text style={STYLES.channelText}>{`${item.sent_by} | ${item.body}`}</Text> 
          );
        }}
        keyExtractor={message => message.id}
      />
      <Text style={STYLES.errorText}>{errorMsg}</Text>

      <View style={STYLES.input}>
        <TextInput
          style={STYLES.inputText}
          placeholder="Message"
          onChangeText={(body) => setBody(body)}
        /> 
      </View>
      <TouchableOpacity
        style={STYLES.btn2}
        onPress={() => onSendMessage()}
      >
        <Text style={STYLES.btnText}>Send</Text> 
      </TouchableOpacity>
    </View>
  );
}

export default Messages;
