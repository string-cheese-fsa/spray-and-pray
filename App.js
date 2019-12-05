import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
  Dimensions,
  TextInput,
  Alert
} from "react-native";
import { Provider, connect } from "react-redux";
import { ViroARSceneNavigator } from "react-viro";
import store from "./store";
import {
  getDrawing,
  saveDrawing,
  getAllDrawings,
  getNearbyDrawings,
  undo,
  clear
} from "./store/drawing";
import Map from "./js/Map";

var sharedProps = {
  material: "red",
  calibratingStatus: "",
  timer: 0
};

var InitialARScene = require("./js/Main");
var UNSET = "UNSET";
var MAP = "MAP";
var AR_NAVIGATOR_TYPE = "AR";
var defaultNavigatorType = UNSET;
console.disableYellowBox = true;

class ViroSample extends Component {
  constructor() {
    super();
    this.state = {
      allView: false,
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      text: "",
      lat: 0,
      long: 0,
      showSaveForm: false,
      title: ""
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.sceneRef = React.createRef();
    this.download = this.download.bind(this);
    this.save = this.save.bind(this);
    this.resetARSession = this.resetARSession.bind(this);
    this.foundCanvas = this.foundCanvas.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoFailure = this.geoFailure.bind(this);
    this.getSaveForm = this.getSaveForm.bind(this);
  }

  resetARSession() {
    this.sceneRef.current._resetARSession(true, false);
  }

  async componentDidMount() {
    this.setState(previousState => {
      return {
        sharedProps: {
          ...previousState.sharedProps,
          resetARSession: this.resetARSession,
          foundCanvas: this.foundCanvas
        }
      };
    });
    await navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      { enableHighAccuracy: true }
    );
  }

  geoSuccess = position => {
    console.log("getting location...");
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
  };
  geoFailure = error => {
    console.log(error.code, error.message);
  };

  download(id) {
    this.props.getDrawing(id);
  }

  save(drawing) {
    if (this.state.title === "") {
      Alert.alert("Error", "Title cannot be blank!", [{ text: "OK" }], {
        cancelable: false
      });
    } else {
      this.props.saveDrawing(drawing);
      this.setState({
        showSaveForm: false,
        title: ""
      });
    }
  }

  getSaveForm() {
    this.setState({
      showSaveForm: true
    });
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType == MAP) {
      return this._map();
    }
  }

  _map() {
    return <Map></Map>;
  }

  _getExperienceSelector() {
    return (
      <ImageBackground
        source={{
          uri:
            "https://images-na.ssl-images-amazon.com/images/I/81C1IiM37gL._SX466_.jpg"
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={localStyles.outer}>
          <View style={localStyles.inner}>
            <Text style={localStyles.titleText}>{`Spray-R  `}</Text>
            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
              underlayColor={"#68a0ff"}
            >
              <Text style={localStyles.buttonText}>Start Drawing</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this._getExperienceButtonOnPress(MAP)}
              underlayColor={"#68a0ff"}
            >
              <Text style={localStyles.buttonText}>Explore</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    );
  }

  clickHandler(color) {
    this.setState(previousState => {
      return {
        sharedProps: { ...previousState.sharedProps, material: color }
      };
    });
  }

  foundCanvas() {
    this.setState(prevState => {
      return {
        sharedProps: { ...prevState.sharedProps, calibratingStatus: "found" }
      };
    });
  }

  _getARNavigator() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)" }}>
          <ViroARSceneNavigator
            viroAppProps={this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
            ref={this.sceneRef}
          />
          <View
            style={{
              position: "absolute",
              backgroundColor: "rgba(52, 52, 52, 0.5)",
              flexDirection: "row",
              alignSelf: "center"
            }}
          >
            {this.state.sharedProps.calibratingStatus === "searching" ? (
              <Text style={{ ...localStyles.instructions, color: "blue" }}>
                Calibrating...Please remain still while we find a canvas...
              </Text>
            ) : this.state.sharedProps.calibratingStatus === "found" ? (
              <Text style={{ ...localStyles.instructions, color: "green" }}>
                Calibration success! Hold the screen to begin painting.
              </Text>
            ) : this.state.sharedProps.calibratingStatus === "failed" ? (
              <Text style={{ ...localStyles.instructions, color: "red" }}>
                No canvas detected. Please try again.
              </Text>
            ) : (
              <Text style={{ ...localStyles.instructions, color: "white" }}>
                Find a flat surface and click "Start" to begin.
              </Text>
            )}
          </View>
          {this.state.allView && this.props.allDrawings.length ? (
            <View style={{ left: Dimensions.get("window").width / 2 }}>
              <ScrollView
                style={{
                  position: "absolute",
                  bottom: Dimensions.get("window").height / 14,
                  backgroundColor: "rgba(52, 52, 52, 0)"
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              >
                {this.props.allDrawings.map(drawing => (
                  <TouchableHighlight
                    style={localStyles.colorButtons}
                    key={drawing.id}
                    onPress={() => {
                      this.download(drawing.id);
                      this.setState(prev => {
                        return { allView: !prev.allView };
                      });
                    }}
                  >
                    <Text>{drawing.title}</Text>
                  </TouchableHighlight>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View></View>
          )}
          {this.state.showSaveForm ? (
            <View style={localStyles.saveForm}>
              <Text style={{ ...localStyles.instructions, color: "white" }}>
                Please enter the title of your creation:
              </Text>
              <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                placeholder="Title"
                placeholderTextColor="white"
                selectionColor="white"
                onChangeText={text => this.setState({ title: text })}
                value={this.state.title}
              />
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableHighlight
                  style={{ ...localStyles.colorButtons }}
                  title="Save"
                  onPress={() => {
                    this.save({
                      lines: this.props.lines,
                      lat: this.state.lat,
                      long: this.state.long,
                      title: this.state.title
                    });
                  }}
                >
                  <Text>Save</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...localStyles.colorButtons }}
                  title="Go back"
                  onPress={() => {
                    this.setState({ showSaveForm: false });
                  }}
                >
                  <Text>Go back</Text>
                </TouchableHighlight>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                position: "absolute",
                top: (Dimensions.get("window").height * 11) / 12,
                flexDirection: "row",
                backgroundColor: "rgba(52, 52, 52, 0)",
                alignSelf: "center",
                justifyContent: "center"
              }}
            >
              <TouchableHighlight
                style={{
                  ...localStyles.colorButtons,
                  backgroundColor: "green"
                }}
                title="start"
                onPress={() => {
                  let timer = setTimeout(() => {
                    if (this.state.sharedProps.calibratingStatus !== "found") {
                      this.setState(prevState => {
                        return {
                          sharedProps: {
                            ...prevState.sharedProps,
                            calibratingStatus: "failed"
                          }
                        };
                      });
                      clearTimeout(timer);
                    } else {
                      clearTimeout(timer);
                    }
                  }, 8000);
                  this.setState(prevState => {
                    return {
                      sharedProps: {
                        timer: timer,
                        ...prevState.sharedProps,
                        calibratingStatus: "searching"
                      }
                    };
                  });
                  this.resetARSession();
                }}
              >
                <Text>Start</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={localStyles.colorButtons}
                title="undo"
                onPress={this.props.undo}
              >
                <Text>Undo</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={localStyles.colorButtons}
                title="clear"
                onPress={this.props.clear}
              >
                <Text>Clear</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...localStyles.colorButtons,
                  backgroundColor: "#26547C"
                }}
                title="blue"
                onPress={() => {
                  this.clickHandler("blue");
                }}
              >
                <Text>Blue</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...localStyles.colorButtons,
                  backgroundColor: "#EF476F"
                }}
                title="red"
                onPress={() => {
                  this.clickHandler("red");
                }}
              >
                <Text>Red</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...localStyles.colorButtons,
                  backgroundColor: "#06D6A0"
                }}
                title="green"
                onPress={() => {
                  this.clickHandler("green");
                }}
              >
                <Text>Green</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...localStyles.colorButtons,
                  backgroundColor: "#FFD166"
                }}
                title="orange"
                onPress={() => {
                  this.clickHandler("orange");
                }}
              >
                <Text>Orange</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...localStyles.colorButtons }}
                title="download"
                onPress={() => {
                  this.props.getNearbyDrawings(this.state.lat, this.state.long);
                  this.setState(prev => {
                    return { allView: !prev.allView };
                  });
                }}
              >
                <Text>Download</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...localStyles.colorButtons }}
                title="save"
                onPress={() => {
                  this.setState(prev => {
                    return { allView: false, showSaveForm: !prev.showSaveForm };
                  });
                }}
              >
                <Text>Save</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </Provider>
    );
  }

  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
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
    borderColor: "#fff"
  },
  colorButtons: {
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
    borderColor: "#fff"
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
    borderColor: "#fff"
  },
  saveForm: {
    position: "absolute",
    bottom: Dimensions.get("window").height / 5,
    left: Dimensions.get("window").width / 14,
    padding: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  crosshair: {
    position: "absolute",
    top: Dimensions.get("window").height / 2,
    left: Dimensions.get("window").width / 2,
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: "grey"
  },
  instructions: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  lines: state.drawing.lines,
  allDrawings: state.drawing.allDrawings
});

const mapDispatchToProps = dispatch => ({
  getDrawing: id => dispatch(getDrawing(id)),
  saveDrawing: drawing => dispatch(saveDrawing(drawing)),
  getAllDrawings: () => dispatch(getAllDrawings()),
  undo: () => dispatch(undo()),
  clear: () => dispatch(clear()),
  getNearbyDrawings: (lat, long) => dispatch(getNearbyDrawings(lat, long))
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(ViroSample);
export default ConnectedApp;
module.exports = ConnectedApp;
