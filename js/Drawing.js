import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export const Drawing = props => {
  return (
    <TouchableHighlight
      style={{
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
        borderColor: '#fff',
      }}
      onClick={() => {
        props.download(props.drawing.item.id);
        props.viewHandler();
      }}
    >
      <Text>{props.drawing.item.id}</Text>
    </TouchableHighlight>
  );
};
