import React, { useState } from 'react';
// import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const [number, setNumber] = useState('')

  const addOne = () =>{
    const arr = ['hallo', 'doei', 'tot morgen']
    const random = Math.floor(Math.random() * 3)
    if (number === arr[random]){
      return addOne()
    }
    setNumber(arr[random])
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.gino}>
        <Text style={styles.white}>{number}</Text>
        <Button title="Groet" onPress={addOne} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color: 'orange',
    fontSize: 64,
    backgroundColor: '#000'
  },
  gino: {
    backgroundColor: '#fff',
    borderLeftColor: 'red',
    borderBottomColor: 'blue',
    borderRightColor: 'white',
    borderTopColor: 'orange',
    borderWidth: 3,
    // borderStyle: 'line',
    borderRadius: 1,
  }
});
