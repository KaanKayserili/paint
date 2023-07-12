import React, { useState } from 'react';
import { Modal, Text } from 'react-native';
import { View, TouchableOpacity, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import ColorPopUp from './colorPopUp';
import StrokePopUp from './strokePopUp';

let colors = ["#000"];
let strokes = [5]

export default function PaintApp() {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [chooseColor, setChooseColor] = useState("#000");
  const [chooseStroke, setChooseStroke] = useState(5);

  const [visibleColorPopUp, setVisibleColorPopUp] = useState(false);
  const [visibleStrokePopUp, setVisibleStrokePopUp] = useState(false);


  const handlePanResponderGrant = ({ nativeEvent }) => {
    const { locationX, locationY } = nativeEvent;
    const newPath = `M${locationX},${locationY}`;
    setCurrentPath(newPath);
    setPaths((prevPaths) => [...prevPaths, newPath]);
    colors.push(chooseColor);
    strokes.push(chooseStroke);
  };

  const handlePanResponderMove = ({ nativeEvent }) => {

    if (currentPath === '') return;

    const { locationX, locationY } = nativeEvent;
    const updatedPath = `${currentPath} L${locationX},${locationY}`;

    setCurrentPath(updatedPath);

    setPaths((prevPaths) => {
      const updatedPaths = [...prevPaths];
      updatedPaths[updatedPaths.length - 1] = updatedPath;
      return updatedPaths;
    });
  };

  const handlePanResponderRelease = () => {
    setCurrentPath('');
  };

  const handleClear = () => {
    setPaths([]);
    setCurrentPath('');
    colors = [];
    strokes = [];
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: handlePanResponderGrant,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>

      <Modal visible={visibleColorPopUp} transparent={true} animationType={"slide"}>
        <ColorPopUp chooseColor={chooseColor} setChooseColor={setChooseColor} setVisibleColorPopUp={setVisibleColorPopUp} />
      </Modal>

      <Modal visible={visibleStrokePopUp} transparent={true} animationType={"slide"}>
        <StrokePopUp chooseColor={chooseStroke} setChooseStroke={setChooseStroke} setVisibleStrokePopUp={setVisibleStrokePopUp} />
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { setVisibleColorPopUp(true) }}>
          <Text style={styles.buttonText}>Colors</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { setVisibleStrokePopUp(true) }}>
          <Text style={styles.buttonText}>Stroke</Text>
        </TouchableOpacity>
      </View>

      <Svg style={styles.canvas}>
        {paths.map((path, index) => (
          <Path key={index} d={path} stroke={colors[index]} strokeWidth={strokes[index]} fill="none" />
        ))}
      </Svg>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#fff',
  },
  canvas: {
    flex: 8,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: 40,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: "28%",
    backgroundColor: "#000",
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});