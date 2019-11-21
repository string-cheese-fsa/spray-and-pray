'use strict'

import React, { Component } from 'react'
import { StyleSheet, PixelRatio, Dimensions, View, Text } from 'react-native'
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroPolyline,
  ViroMaterials
} from 'react-viro'

export default class Main extends Component {
  constructor() {
    super()

    // Set initial state here
    this.state = {
      text: '',
      x: 0,
      y: 0,
      coords: [[0, 0, -2]]
    }
    this.myRef = React.createRef()
    // bind 'this' to functions
    this._onTrackingUpdated = this._onTrackingUpdated.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      this.myRef.current
        .performARHitTestWithPoint((Dimensions.get('window').width * PixelRatio.get()) / 2, (Dimensions.get('window').height * PixelRatio.get()) / 2)
        //.getCameraOrientationAsync()
        .then(orientation => {
          let target = orientation.map(obj => obj.transform.position)
          if (target) {
            // this.setState({
            // x: target.transform.position[0].toFixed(2),
            // y: target.transform.position[1].toFixed(2)
            // })
          }

          // this.setState(prevState => ({
          //   x: target.position[0].toFixed(2) * 10,
          //   y: target.position[1].toFixed(2) * 10
          // }))

          if (target) {
            this.setState(prevState => ({
              coords: [
                ...prevState.coords, ...target
              ]
            }))
          }
        })
        .catch(error => console.error(error))
    }, 100) // 100 ms
  }

  _onTrackingUpdated(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      // Show my AR Scene experience
      this.setState({
        coords: [[0, 0, -2]]
      })
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Prompt user to move phone around
      this.setState({
        text: 'Move the phone around!'
      })
    }
  }

  render() {
    return (
        <ViroARScene ref={this.myRef} onTrackingUpdated={this._onTrackingUpdated}>
          <ViroText
            text={`X: ${this.state.x}  Y:${this.state.y}`}
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
    )
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})

module.exports = Main
