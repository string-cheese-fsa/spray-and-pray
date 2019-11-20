'use strict';

import React, { Component } from 'react';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import { ViroARScene, ViroText, ViroConstants } from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: `init...`,
    };
    this.myRef = React.createRef();
    // bind 'this' to functions
    this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.myRef.current.getCameraOrientationAsync().then(orientation => {
        this.setState({
          text: `x: ${orientation.position[0].toFixed(
            3
          )} y: ${orientation.position[1].toFixed(
            3
          )} z: ${orientation.position[2].toFixed(3)}`,
        });
      });
    }, 100); // 100 ms
  }

  _onTrackingUpdated(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      // Show my AR Scene experience
      this.setState({
        text: `Tracking initialized`,
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Prompt user to move phone around
      this.setState({
        text: 'Move the phone around!',
      });
    }
  }

  render() {
    return (
      <ViroARScene ref={this.myRef} onTrackingUpdated={this._onTrackingUpdated}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
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
