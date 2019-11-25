'use strict';

import React, { Component } from 'react';
import { StyleSheet, PixelRatio, Dimensions, View, Text } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroPolyline,
  ViroMaterials,
  ViroSphere,
  ViroNode,
  ViroSpotLight,
  ViroButton,
} from 'react-viro';

export default class Main extends Component {
  constructor(props) {
    super();

    // Set initial state here
    this.state = {
      text: '',
      x: 0,
      y: 0,
      z: 0,
      camCoords: [0, 0, 0],
      position: [],
      coords: [],
      lines: [],
      painting: false,
    };
    this.cameraRef = React.createRef();
    this.sphereRef = React.createRef();
    // bind 'this' to functions
    this._onClickState = this._onClickState.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.cameraRef.current
        .getCameraOrientationAsync()
        .then(orientation => {
          this.setState(prevState => ({
            x: orientation.forward[0] * 10,
            y: orientation.forward[1] * 10,
            z: orientation.forward[2] * 10,
            camCoords: orientation.position,
          }));
          if (this.state.painting) {
            if (this.state.coords.length) {
              this.setState(prevState => ({
                coords: [
                  ...prevState.coords,
                  [this.state.x, this.state.y, this.state.z],
                ],
              }));
            } else {
              this.setState(prevState => ({
                coords: [[this.state.x, this.state.y, this.state.z]],
                position: [this.state.x, this.state.y, this.state.z],
              }));
            }
          }
        })
        .catch(error => console.error(error));
    }, 10);
  }

  _onClickState(stateValue, position, source) {
    switch (stateValue) {
      case 1:
        this.setState(prev => ({
          painting: true,
          coords: [[prev.x, prev.y, prev.z]],
        }));
        break;
      case 2:
        this.setState(prevState => {
          return {
            painting: false,
            lines: [
              ...prevState.lines,
              {
                points: [...prevState.coords],
                position: [prevState.x, prevState.y, prevState.z],
                material: this.props.arSceneNavigator.viroAppProps.material,
              },
            ],
            coords: [],
          };
        });
        break;
      case 3:
        break;
      default:
    }
  }

  render() {
    return (
      <ViroARScene
        ref={this.cameraRef}
        onClickState={this._onClickState}
      >
        <ViroText
          text={`color ${this.props.arSceneNavigator.viroAppProps.material}`}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroSphere
          ref={this.sphereRef}
          heightSegmentCount={10}
          widthSegmentCount={10}
          radius={0.25}
          position={[this.state.x, this.state.y, this.state.z]}
        />
        {this.state.coords.length ? (
          <ViroPolyline
            points={this.state.coords}
            thickness={0.4}
            materials={this.props.arSceneNavigator.viroAppProps.material}
          />
        ) : (
          <ViroText text={''} />
        )}
        {this.state.lines.map(line => {
          return (
            <ViroPolyline
              key={line.points[0]}
              points={line.points}
              materials={line.material}
              thickness={0.4}
            />
          );
        })}
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

ViroMaterials.createMaterials({
  red: {
    diffuseColor: '#EF476F',
  },
  blue: {
    diffuseColor: '#26547C',
  },
  green: {
    diffuseColor: '#06D6A0',
  },
  orange: {
    diffuseColor: '#FFD166'
  },

});

module.exports = Main;
