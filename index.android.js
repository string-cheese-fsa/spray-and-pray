import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './store/index';

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
AppRegistry.registerComponent('Spray-R', () => Root);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('Spray-R', () => Root);
