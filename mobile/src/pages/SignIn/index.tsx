import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

export default function SignIn(){
  return(
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_trial.png')}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu email"   
          style={styles.input}     
          placeholderTextColor="#F0F0F0"
        />

        <TextInput
          placeholder="Sua Senha"      
          style={styles.input}   
          placeholderTextColor="#F0F0F0"
          secureTextEntry={true}
        />     

        <TouchableOpacity style={styles.button}>
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
    marginBottom: 0,
    resizeMode: "center"    
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
