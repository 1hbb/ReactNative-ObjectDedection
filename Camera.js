import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';
import apiRequest from './apiRequest';
import CameraRoll from '@react-native-community/cameraroll';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function StoryCamera() {
  const selectProfilePic = () => {
    var options = {
      title: 'Select Image',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, async (res) => {
      //console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        let source = res;
        var image = await RNFS.readFile(source.uri, 'base64').then((res) => {
          return res;
        });

        var response = await apiRequest(image);
        //console.log(response);
        var objects = 'Objects in this image: ';
        var x = response.responses[0].labelAnnotations[0].description;
        for (
          let index = 0;
          index < response.responses[0].labelAnnotations.length;
          index++
        ) {
          const object =
            response.responses[0].labelAnnotations[index].description;
          objects += object + ' ,';
        }

        createTwoButtonAlert(objects);
      }
    });
  };

  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line

    CameraRoll.save(data.uri, {type: 'photo'});

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

    createTwoButtonAlert(objects);
  };

  return (
    <RNCamera
      style={Styles.cameraContainer}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}>
      {({camera}) => {
        return (
          <>
            <TouchableOpacity
              style={{
                marginBottom: 20,
                backgroundColor: 'white',
                borderRadius: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
              }}
              onPress={() => selectProfilePic()}>
              <Text style={{color: 'black'}}>Camera Roll</Text>
            </TouchableOpacity>
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
