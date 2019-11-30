/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React, { Component } from "react";
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
<<<<<<< HEAD
  SectionList,
} from 'react-native';
import { Provider } from 'react-redux';

import { ViroVRSceneNavigator, ViroARSceneNavigator } from 'react-viro';
import { Dimensions, Button } from 'react-native';
import store from './store';
=======
  ImageBackground
} from "react-native";
import { Provider } from "react-redux";
import { ViroVRSceneNavigator, ViroARSceneNavigator } from "react-viro";
import { Dimensions, Button } from "react-native";
import store from "./store";
import { connect } from "react-redux";
import { getDrawing, saveDrawing } from "./store/drawing";

const mapDispatchToProps = dispatch => ({
  getDrawing: id => dispatch(getDrawing(id)),
  saveDrawing: drawing => dispatch(saveDrawing(drawing))
});

>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
/*
 TODO: Insert your API key below
 */
var sharedProps = {
<<<<<<< HEAD
  material: 'red',
};

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/Main');
var InitialVRScene = require('./js/HelloWorldScene');

var UNSET = 'UNSET';
var VR_NAVIGATOR_TYPE = 'VR';
var AR_NAVIGATOR_TYPE = 'AR';
=======
  material: "red"
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./js/Main");
var InitialVRScene = require("./js/HelloWorldScene");

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      allView: false,
      navigatorType: defaultNavigatorType,
<<<<<<< HEAD
      sharedProps: sharedProps,
=======
      sharedProps: sharedProps
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.sceneRef = React.createRef();
<<<<<<< HEAD
=======
    this.download = this.download.bind(this);
    this.save = this.save.bind(this);
  }

  download(id) {
    this.props.getDrawing(id);
  }

  save(drawing) {
    this.props.saveDrawing(drawing);
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
<<<<<<< HEAD
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
=======
    }  else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
      return this._getARNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
    <ImageBackground source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/81C1IiM37gL._SX466_.jpg'}} style={{width: '100%', height: '100%'}}>
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>

          <Text style={localStyles.titleText}>
            {`Spray-R  `}
          </Text>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={"#68a0ff"}
          >
            <Text style={localStyles.buttonText}>Start Drawing</Text>
          </TouchableHighlight>

        </View>
      </View>
<<<<<<< HEAD
=======
      </ImageBackground>
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
    );
  }

  clickHandler(color) {
    this.setState({ sharedProps: { material: color } });
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)" }}>
          <ViroARSceneNavigator
            viroAppProps={this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
          />
          {this.state.allView && (
            <View>
              <SectionList data={store.getState().drawing.allDrawings} />
            </View>
          )}
          <View
            style={{
<<<<<<< HEAD
              flexDirection: 'row',
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
=======
              flexDirection: "row",
              backgroundColor: "rgba(52, 52, 52, 0.8)"
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
            }}
          >
            <TouchableHighlight
              style={{
                ...localStyles.colorButtons,
<<<<<<< HEAD
                backgroundColor: '#26547C',
              }}
              title="blue"
              onPress={() => {
                this.clickHandler('blue');
=======
                backgroundColor: "#26547C"
              }}
              title="blue"
              onPress={() => {
                this.clickHandler("blue");
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
              }}
            >
              <Text>Blue</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...localStyles.colorButtons,
<<<<<<< HEAD
                backgroundColor: '#EF476F',
              }}
              title="red"
              onPress={() => {
                this.clickHandler('red');
=======
                backgroundColor: "#EF476F"
              }}
              title="red"
              onPress={() => {
                this.clickHandler("red");
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
              }}
            >
              <Text>Red</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...localStyles.colorButtons,
<<<<<<< HEAD
                backgroundColor: '#06D6A0',
              }}
              title="green"
              onPress={() => {
                this.clickHandler('green');
=======
                backgroundColor: "#06D6A0"
              }}
              title="green"
              onPress={() => {
                this.clickHandler("green");
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
              }}
            >
              <Text>Green</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...localStyles.colorButtons,
<<<<<<< HEAD
                backgroundColor: '#FFD166',
              }}
              title="orange"
              onPress={() => {
                this.clickHandler('orange');
=======
                backgroundColor: "#FFD166"
              }}
              title="orange"
              onPress={() => {
                this.clickHandler("orange");
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
              }}
            >
              <Text>Orange</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...localStyles.colorButtons }}
              title="download"
              onPress={() => {
                this.download(8);
              }}
            >
              <Text>Download</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...localStyles.colorButtons }}
              title="download"
              onPress={() => {
                this.save(this.props.lines);
              }}
            >
              <Text>Save</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Provider>
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }}
        onExitViro={this._exitViro}
      />
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
<<<<<<< HEAD
        navigatorType: navigatorType,
=======
        navigatorType: navigatorType
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
<<<<<<< HEAD
      navigatorType: UNSET,
=======
      navigatorType: UNSET
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
    });
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: 'black',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
=======
    backgroundColor: "black"
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "black"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "black"
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
<<<<<<< HEAD
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
=======
    color: "#fff",
    textAlign: "center",
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
<<<<<<< HEAD
    borderColor: '#fff',
=======
    borderColor: "#fff"
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
  },
  colorButtons: {
    // display: "flex",
    flexDirection: "row",
    direction: "ltr",
    flexWrap: "wrap",
    height: 50,
    width: 50,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
<<<<<<< HEAD
    borderColor: '#fff',
=======
    borderColor: "#fff"
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
<<<<<<< HEAD
    borderColor: '#fff',
=======
    borderColor: "#fff"
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
  },
  crosshair: {
    position: "absolute",
    top: Dimensions.get("window").height / 2,
    left: Dimensions.get("window").width / 2,
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
<<<<<<< HEAD
    backgroundColor: 'grey',
  },
});

module.exports = ViroSample;
=======
    backgroundColor: "grey"
  }
});

const mapStateToProps = state => ({
  lines: state.drawing.lines
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(ViroSample);
export default ConnectedApp;
module.exports = ConnectedApp;
>>>>>>> d42c48ee452abd02f4ed56c1ed248f36909c5d78
