import React from 'react';
import {View} from 'react-native';
import Camera from './Camera';
import {connect} from 'react-redux';
import AnalizePage from './AnalizePage';
import LoadingPage from './LoadingPage';

const Main = ({openAnalizePage, loading}) => {
  return loading ? (
    <LoadingPage />
  ) : openAnalizePage ? (
    <AnalizePage />
  ) : (
    <Camera />
  );
};

const mapStateToProps = (state) => {
  return {
    openAnalizePage: state.mainData.openAnalizePage,
    loading: state.mainData.loading,
  };
};

export default connect(mapStateToProps, null)(Main);
