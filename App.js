import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import Drawing from './Drawing'

const App = () => {

  let screen = <Drawing />;

  return (
    <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  }
})