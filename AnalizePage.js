import React from 'react';
import {Button, SafeAreaView, View, Dimensions, ScrollView} from 'react-native';
import {Text as RNText} from 'react-native';
import {connect} from 'react-redux';
import {openAnalizePage} from './actions/fetchMainfeedAction';
import Svg, {Line, Image, Rect, Text} from 'react-native-svg';

const AnalizePage = ({closeAnalizePage, dataJson, imageProps}) => {
  const IMAGE_HEIGHT =
    (Dimensions.get('screen').width / imageProps.width) * imageProps.height;

  const IMAGE_WIDTH = Dimensions.get('screen').width;

  const objectArray = dataJson.responses[0].localizedObjectAnnotations;
  console.log('data:  ', objectArray);

  var rectangles = [];

  var arrayLength = 0;

  if (objectArray == undefined) {
    arrayLength = 0;
  } else {
    arrayLength = objectArray.length;
  }

  for (let index = 0; index < arrayLength; index++) {
    const normalizedVertices =
      objectArray[index].boundingPoly.normalizedVertices;

    const name = objectArray[index].name;
    const score = objectArray[index].score;
    const rect = (
      <Svg height={IMAGE_HEIGHT} width={IMAGE_WIDTH}>
        <Line
          x1={
            normalizedVertices[0].x != null
              ? normalizedVertices[0].x * IMAGE_WIDTH
              : 0
          }
          y1={
            normalizedVertices[0].y != null
              ? normalizedVertices[0].y * IMAGE_HEIGHT
              : 0
          }
          x2={
            normalizedVertices[1].x != null
              ? normalizedVertices[1].x * IMAGE_WIDTH
              : 0
          }
          y2={
            normalizedVertices[1].y != null
              ? normalizedVertices[1].y * IMAGE_HEIGHT
              : 0
          }
          stroke="red"
          strokeWidth="2"
        />
        <Line
          x1={
            normalizedVertices[0].x != null
              ? normalizedVertices[0].x * IMAGE_WIDTH
              : 0
          }
          y1={
            normalizedVertices[0].y != null
              ? normalizedVertices[0].y * IMAGE_HEIGHT
              : 0
          }
          x2={
            normalizedVertices[3].x != null
              ? normalizedVertices[3].x * IMAGE_WIDTH
              : 0
          }
          y2={
            normalizedVertices[3].y != null
              ? normalizedVertices[3].y * IMAGE_HEIGHT
              : 0
          }
          stroke="red"
          strokeWidth="2"
        />
        <Line
          x1={
            normalizedVertices[1].x != null
              ? normalizedVertices[1].x * IMAGE_WIDTH
              : 0
          }
          y1={
            normalizedVertices[1].y != null
              ? normalizedVertices[1].y * IMAGE_HEIGHT
              : 0
          }
          x2={
            normalizedVertices[2].x != null
              ? normalizedVertices[2].x * IMAGE_WIDTH
              : 0
          }
          y2={
            normalizedVertices[2].y != null
              ? normalizedVertices[2].y * IMAGE_HEIGHT
              : 0
          }
          stroke="red"
          strokeWidth="2"
        />
        <Line
          x1={
            normalizedVertices[2].x != null
              ? normalizedVertices[2].x * IMAGE_WIDTH
              : 0
          }
          y1={
            normalizedVertices[2].y != null
              ? normalizedVertices[2].y * IMAGE_HEIGHT
              : 0
          }
          x2={
            normalizedVertices[3].x != null
              ? normalizedVertices[3].x * IMAGE_WIDTH
              : 0
          }
          y2={
            normalizedVertices[3].y != null
              ? normalizedVertices[3].y * IMAGE_HEIGHT
              : 0
          }
          stroke="red"
          strokeWidth="2"
        />
        <Text
          fill="yellow"
          stroke="black"
          fontSize="15"
          strokeWidth="0.1"
          fontWeight="bold"
          x={
            normalizedVertices[0].x != null
              ? normalizedVertices[0].x * IMAGE_WIDTH + 12
              : 0 + 10
          }
          y={
            normalizedVertices[0].y != null
              ? normalizedVertices[0].y * IMAGE_HEIGHT + 12
              : 0 + 10
          }>
          {name}
        </Text>
        <Text
          fill="yellow"
          stroke="black"
          fontSize="12"
          strokeWidth="0.1"
          fontWeight="bold"
          x={
            normalizedVertices[0].x != null
              ? normalizedVertices[0].x * IMAGE_WIDTH + 12
              : 0 + 10
          }
          y={
            normalizedVertices[0].y != null
              ? normalizedVertices[0].y * IMAGE_HEIGHT + 25
              : 0 + 10
          }>
          Score: {score.toFixed(2)}
        </Text>
      </Svg>
    );
    rectangles.push(rect);
  }

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
      <ScrollView>
        <Button title="Close" onPress={() => closeAnalizePage()} />
        <RNText style={{color: 'white', alignSelf: 'center'}}>
          Number of objects: {arrayLength}
        </RNText>
        <Svg height={IMAGE_HEIGHT} width={IMAGE_WIDTH} style={{marginTop: 20}}>
          <Image
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            href={imageProps.uri}
          />
          {rectangles}
        </Svg>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    dataJson: state.mainData.data,
    imageProps: state.mainData.imageProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeAnalizePage: () => dispatch(openAnalizePage(false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalizePage);
