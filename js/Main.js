'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroPolyline,
  ViroMaterials,
} from 'react-viro';

export default class Main extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: '',
      x: 0,
      y: 0,
      coords: [[0, 0, -2]],
    };
    this.myRef = React.createRef();
    // bind 'this' to functions
    this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.myRef.current
        .getCameraOrientationAsync()
        .then(orientation => {
          this.setState(prevState => ({
            x: orientation.forward[0].toFixed(2) * 10,
            y: orientation.forward[1].toFixed(2) * 10,
          }));

          if (orientation.position.length) {
            this.setState(prevState => ({
              coords: [
                ...prevState.coords,
                [
                  orientation.forward[0] * 10,
                  orientation.forward[1] * 10,
                  orientation.forward[2] * 10,
                ],
              ],
            }));
          }
        })
        .catch(error => console.error(error));
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
      this.setState({
        text: 'Move the phone around!',
      });
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
          // materials={'red'}
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

module.exports = Main;
