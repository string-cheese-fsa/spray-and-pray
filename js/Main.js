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
  ViroARPlaneSelector,
  ViroImage,
  ViroARPlane,
} from 'react-viro';

import { connect } from 'react-redux';
import { getAllDrawings, saveDrawing, drawnLines } from '../store/drawing';

class Main extends Component {
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
      painting: false,
    };
    this.cameraRef = React.createRef();
    this.sphereRef = React.createRef();
    // bind 'this' to functions
    this.mapSphereZtoPlane = this.mapSphereZtoPlane.bind(this);
    this._onClickState = this._onClickState.bind(this);
    this.orientCamera = this.orientCamera.bind(this);
  }

  orientCamera() {
    this.cameraRef.current
      .getCameraOrientationAsync()
      .then(orientation => {
        this.setState(prevState => ({
          x: orientation.forward[0] - prevState.camCoords[0],
          z: orientation.forward[1] * -1 - prevState.camCoords[1],
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
  }

  componentDidMount() {
    setInterval(this.orientCamera, 10);
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
        const drawing = {
          points: [...this.state.coords],
          position: [this.state.x, this.state.y, this.state.z],
          material: this.props.arSceneNavigator.viroAppProps.material,
        };
        this.props.drawLines(drawing);
        this.setState(prevState => {
          return {
            painting: false,
            coords: [],
          };
        });
        break;
      case 3:
        break;
      default:
    }
  }

  mapSphereZtoPlane(anchor) {
    this.setState({
      y: anchor.position[0] * -1,
    });
  }

  render() {
    return (
      <ViroARScene
        anchorDetectionTypes={['PlanesVertical']}
        ref={this.cameraRef}
        onClickState={this._onClickState}
      >
        {this.props.arSceneNavigator.viroAppProps.calibratingStatus ===
          'searching' ||
        this.props.arSceneNavigator.viroAppProps.calibratingStatus ===
          'found' ? (
          <ViroARPlaneSelector
            alignment="Vertical"
            dragType="FixedToPlane"
            onPlaneSelected={() => {
              this.props.arSceneNavigator.viroAppProps.foundCanvas();
              this.cameraRef.current
                .getCameraOrientationAsync()
                .then(orientation => {
                  this.setState({
                    camCoords: [
                      orientation.forward[0],
                      orientation.forward[1],
                      orientation.forward[2],
                    ],
                    x: 0,
                    y: 0,
                    z: 0,
                  });
                });
            }}
          >
            <ViroPolyline
              points={[
                [0, 0, 0],
                [this.state.x, this.state.y, this.state.z],
              ]}
              thickness={0.08}
              materials={'transparent'}
            />
            {this.state.coords.length ? (
              <ViroPolyline
                points={this.state.coords}
                thickness={0.008}
                materials={this.props.arSceneNavigator.viroAppProps.material}
              />
            ) : (
              <ViroText text={''} />
            )}
            {this.props.lines.map(line => {
              return (
                <ViroPolyline
                  key={line.points[0]}
                  points={line.points}
                  materials={line.material}
                  thickness={0.008}
                />
              );
            })}
          </ViroARPlaneSelector>
        ) : (
          <ViroText text={''} />
        )}
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
    diffuseColor: '#FFD166',
  },
  transparent: {
    diffuseColor: 'rgba(55, 55, 55, 0.8)',
  },
});

const mapStateToProps = state => ({
  lines: state.drawing.lines,
});

const mapDispatchToProps = dispatch => ({
  drawLines: lines => dispatch(drawnLines(lines)),
  saveDrawing: drawing => dispatch(saveDrawing(drawing)),
});

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);
export default ConnectedMain;
module.exports = ConnectedMain;
