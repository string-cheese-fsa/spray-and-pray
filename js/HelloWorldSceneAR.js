'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ViroARScene, ViroText, ViroConstants, ViroPolyline } from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      x: 0,
      y: 0,
      coords: [[0, 0, 0]],
    };
    this.myRef = React.createRef();
    // bind 'this' to functions
    this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.myRef.current.getCameraOrientationAsync().then(orientation => {
        this.setState(prevState => ({
          x: orientation[0].toFixed(2),
          y: orientation[1].toFixed(2),
          coords: [...prevState.coords, [prevState.x, prevState.y, -3]],
        }));
      });
    }, 100); // 100 ms
  }

  _onTrackingUpdated(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      // Show my AR Scene experience
      this.setState({
        coords: [[0, 0, -2]],
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Prompt user to move phone around
      // this.setState({
      //   text: 'Move the phone around!',
      // });
    }
  }

  render() {
    return (
      <ViroARScene ref={this.myRef} onTrackingUpdated={this._onTrackingUpdated}>
        <ViroText
          text={`x: ${this.state.x} y: ${this.state.y}`}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroPolyline
          position={[0, 0, -2]}
          points={this.state.coords}
          thickness={0.2}
          // materials={['red']}
        />
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
