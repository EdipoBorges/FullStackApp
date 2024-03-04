import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

import { AuthContext } from '../../contexts/AuthContext';


export default function SignIn(){
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(){

    if(email === '' || password === ''){
      return
    }

   await signIn({email, password})
    
  }

  return(
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_trial.jpg')}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu Email"   
          style={styles.input}     
          placeholderTextColor="#F0F0F0"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Sua Senha"      
          style={styles.input}   
          placeholderTextColor="#F0F0F0"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />     
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>   
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#1d2e24'
  },
  logo:{
    marginBottom: 18
  },
  inputContainer:{
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input:{
    width: '95%',
    height: 40,
    backgroundColor: '#102626',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#FFF'
  },
  button:{
    width: '95%',
    height: 40,
    backgroundColor: '#3fffcf',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
   fontSize: 18, 
   fontWeight: 'bold',
   color: '#102623'
  }
})
