import React, { useState } from 'react';
import { Text } from 'react-native';
import { View, TouchableOpacity, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function PaintApp() {
  const [paths, setPaths] = useState([]);
  const [colors, setColors] = useState([]);
  const [strokes, setStrokes] = useState([]);
  const [currentPath, setCurrentPath] = useState("");

  const [chooseColor, setChooseColor] = useState("#000");
  const [chooseStroke, setChooseStroke] = useState(5);

  const handlePanResponderGrant = ({ nativeEvent }) => {
    const { locationX, locationY } = nativeEvent;
    const newPath = `M${locationX},${locationY}`;
    setCurrentPath(newPath);
    setPaths((prevPaths) => [...prevPaths, newPath]);
  };

  const handlePanResponderMove = ({ nativeEvent }) => {

    if (currentPath === '') return;

    const { locationX, locationY } = nativeEvent;
    const updatedPath = `${currentPath} L${locationX},${locationY}`;
    setCurrentPath(updatedPath);
    setColors((prevColors) => [...prevColors, chooseColor]);
    setStrokes((prevStrokes) => [...prevStrokes, chooseStroke]);
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
  };

  const handleColor = () => {
    if (chooseColor == "#000") {
      setChooseColor((prevChooseColor) => prevChooseColor = "#FF6101")
    }
    else {
      setChooseColor((prevChooseColor) => prevChooseColor = "#000")
    }
  }

  const handleStroke = () => {
    if (chooseStroke == 5) {
      setChooseStroke((setChooseStroke) => setChooseStroke = 20)
    }
    else {
      setChooseStroke((setChooseStroke) => setChooseStroke = 5);
    }
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: handlePanResponderGrant,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg style={styles.canvas}>
        {paths.map((path, index) => (
          <Path key={index} d={path} stroke={colors[index]} strokeWidth={strokes[index]} fill="none" />
        ))}
      </Svg>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: chooseColor }]} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: chooseColor }]} onPress={handleColor}>
          <Text style={styles.buttonText}>Colors</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: chooseColor }]} onPress={handleStroke}>
          <Text style={styles.buttonText}>Stroke</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: "28%",
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});