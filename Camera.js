import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';
import apiRequest from './apiRequest';
import CameraRoll from '@react-native-community/cameraroll';
import {launchImageLibrary} from 'react-native-image-picker';
import {fetchData} from './actions/fetchMainfeedAction';

const Camera = ({fetchDataFromApi, dataJson}) => {
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

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
        var base64string = await RNFS.readFile(source.uri, 'base64').then(
          (res) => {
            return res;
          },
        );
        fetchDataFromApi(base64string, source);
      }
    });
  };

  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);

    async function savePicture() {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }

      CameraRoll.save(data.uri, {type: 'photo'});
    }

    savePicture();

    var string64 = await RNFS.readFile(data.uri, 'base64').then((res) => {
      return res;
    });

    console.log(data);
    fetchDataFromApi(string64, data);
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
};

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

const mapStateToProps = (state) => {
  return {
    dataJson: state.mainData.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataFromApi: (base64string, imageProps) =>
      dispatch(fetchData(base64string, imageProps)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
