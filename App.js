/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  ImageBackground,
  FlatList,
  ScrollView
} from 'react-native'
import { Provider } from 'react-redux'
import { ViroVRSceneNavigator, ViroARSceneNavigator } from 'react-viro'
import { Dimensions, Button } from 'react-native'
import store from './store'
import { connect } from 'react-redux'
import { getDrawing, saveDrawing, getAllDrawings } from './store/drawing'

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  material: 'red'
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/Main')
var InitialVRScene = require('./js/HelloWorldScene')

var UNSET = 'UNSET'
var VR_NAVIGATOR_TYPE = 'VR'
var AR_NAVIGATOR_TYPE = 'AR'

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET

class ViroSample extends Component {
  constructor() {
    super()

    this.state = {
      allView: false,
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this)
    this._getARNavigator = this._getARNavigator.bind(this)
    this._getVRNavigator = this._getVRNavigator.bind(this)
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    )
    this._exitViro = this._exitViro.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.sceneRef = React.createRef()
    this.download = this.download.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    this.props.getAllDrawings()
  }

  download(id) {
    this.props.getDrawing(id)
  }

  save(drawing) {
    this.props.saveDrawing(drawing)
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector()
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator()
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <ImageBackground
        source={{
          uri:
            'https://images-na.ssl-images-amazon.com/images/I/81C1IiM37gL._SX466_.jpg'
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={localStyles.outer}>
          <View style={localStyles.inner}>
            <Text style={localStyles.titleText}>{`Spray-R  `}</Text>

            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
              underlayColor={'#68a0ff'}
            >
              <Text style={localStyles.buttonText}>Start Drawing</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    )
  }

  clickHandler(color) {
    this.setState({ sharedProps: { material: color } })
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
          <ViroARSceneNavigator
            viroAppProps={this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
          />
          {this.state.allView && this.props.allDrawings.length ? (
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              >
                {this.props.allDrawings.map(drawing => (
                  <TouchableHighlight
                    style={localStyles.colorButtons}
                    onPress={() => {
                      this.download(drawing.id)
                      this.setState(prev => {
                        return { allView: !prev.allView }
                      })
                    }}
                  >
                    <Text>{drawing.id}</Text>
                  </TouchableHighlight>
                ))}
              </ScrollView>
              {/* <FlatList
                keyExtractor={item => `${item.id}`}
                data={this.props.allDrawings}
                renderItem={drawing => (
                  <TouchableHighlight
                    style={localStyles.colorButtons}
                    onPress={() => {
                      this.download(drawing.item.id);
                      this.setState(prev => {
                        return { allView: !prev.allView };
                      });
                    }}
                  >
                    <Text>{drawing.item.id}</Text>
                  </TouchableHighlight>
                )}
              /> */}
            </View>
          ) : (
            <View></View>
          )}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgba(52, 52, 52, 0.8)'
            }}
          >
            <TouchableHighlight
              style={{
                ...localStyles.colorButtons,
                backgroundColor: '#26547C'
              }}
              title="blue"
              onPress={() => {
                this.clickHandler('blue')
              }}
            >
              <Text>Blue</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...localStyles.colorButtons,
                backgroundColor: '#EF476F'
              }}
              title="red"
              onPress={() => {
                this.clickHandler('red')
              }}
            >
              <Text>Red</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...localStyles.colorButtons,
                backgroundColor: '#06D6A0'
              }}
              title="green"
              onPress={() => {
                this.clickHandler('green')
              }}
            >
              <Text>Green</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...localStyles.colorButtons,
                backgroundColor: '#FFD166'
              }}
              title="orange"
              onPress={() => {
                this.clickHandler('orange')
              }}
            >
              <Text>Orange</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...localStyles.colorButtons }}
              title="download"
              onPress={() => {
                this.props.getAllDrawings()
                this.setState(prev => {
                  return { allView: !prev.allView }
                })
              }}
            >
              <Text>Download</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...localStyles.colorButtons }}
              title="save"
              onPress={() => {
                this.save(this.props.lines)
              }}
            >
              <Text>Save</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Provider>
    )
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }}
        onExitViro={this._exitViro}
      />
    )
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
    // backgroundColor: "black"
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
    // backgroundColor: "black"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  colorButtons: {
    // display: "flex",
    flexDirection: 'row',
    direction: 'ltr',
    flexWrap: 'wrap',
    height: 50,
    width: 50,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  crosshair: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 2,
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: 'grey'
  }
})

const mapStateToProps = state => ({
  lines: state.drawing.lines,
  allDrawings: state.drawing.allDrawings
})

const mapDispatchToProps = dispatch => ({
  getDrawing: id => dispatch(getDrawing(id)),
  saveDrawing: drawing => dispatch(saveDrawing(drawing)),
  getAllDrawings: () => dispatch(getAllDrawings())
})

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(ViroSample)
export default ConnectedApp
module.exports = ConnectedApp
