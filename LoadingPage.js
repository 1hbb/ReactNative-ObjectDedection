import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';

const LoadingPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <Text style={{color: 'white', margin: 30}}>
        Please wait while analyzing the image...
      </Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingPage;
