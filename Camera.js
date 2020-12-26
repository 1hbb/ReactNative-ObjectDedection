import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';
import apiRequest from './apiRequest';

export default function StoryCamera() {
  //StatusBar.setHidden(false);

  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line

    var string64 = await RNFS.readFile(data.uri, 'base64').then((res) => {
      return res;
    });

    //console.log(string64);
    console.log(data.uri);
    var response = await apiRequest(string64);
    //console.log(response);
    var objects = 'Objects in this image: ';
    var x = response.responses[0].labelAnnotations[0].description;
    for (
      let index = 0;
      index < response.responses[0].labelAnnotations.length;
      index++
    ) {
      const object = response.responses[0].labelAnnotations[index].description;
      objects += object + ' ,';
    }

    createTwoButtonAlert(objects)
  };

  return (
    <RNCamera
      style={Styles.cameraContainer}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}>
      {({camera}) => {
        return (
          <>
            <View style={Styles.captureCircle}>
              <TouchableOpacity onPress={() => takePicture(camera)}>
                <View style={Styles.captureButton}></View>
              </TouchableOpacity>
            </View>
          </>
        );
      }}
    </RNCamera>
  );
}

function createTwoButtonAlert(response) {
  return Alert.alert(
    'Alert Title',
    response,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}

const Styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
  },
  captureCircle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    width: 80,
    height: 80,
    borderRadius: 60,
    alignItems: 'center',
    borderColor: 'white',
    marginBottom: 30,
  },
  captureButton: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 40,
  },
});
