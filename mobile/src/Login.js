import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  useNavigate,
} from "react-router-native";

import {COLORS, STYLES, API_URL} from './constants';

function Login() {
  const navigate = useNavigate();
  
  const [errorMsg, setErrorMsg] = useState('');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      const response = await fetch(API_URL + 'login', {
        method: "POST",
        headers: {
        "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        })
      });

      const data = await response.json();

      const success = data.success;
      const error = data.error;

      if (success) {
        const jwt = data.authorization;
        navigate("/channels", { state: {
          jwt: jwt,
        }});
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
      <View style={STYLES.input}>
        <TextInput
          style={STYLES.inputText}
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
        /> 
      </View> 
      <View style={STYLES.input}>
        <TextInput
          style={STYLES.inputText}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <Text style={STYLES.errorText}>{errorMsg}</Text>
      <TouchableOpacity style={STYLES.btn} onPress={() => onLogin()}>
        <Text style={STYLES.btnText}>LOGIN</Text> 
      </TouchableOpacity> 
    </View>
  );
}

export default Login;
