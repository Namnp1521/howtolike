import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';

import Twitter from './src/Twitter';
import Facebook from './src/Facebook';

const App = () => {
  return (
    <SafeAreaView style={{}}>
      {/* <StatusBar translucent backgroundColor={'transparent'} /> */}
      <ScrollView style={{}}>
        <Twitter />
        <Facebook />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
