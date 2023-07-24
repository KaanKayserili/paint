import React, { useState } from 'react';
import { Dimensions, Modal, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import ColorPopUp from './components/colorPopUp';
import StrokePopUp from './components/strokePopUp';
import PopUp from './components/popUp';

const { width } = Dimensions.get("screen")

let colors = ["#000"];
let strokes = [5]

export default function Drawing() {
    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [chooseColor, setChooseColor] = useState("#000");
    const [bgColor, setBgColor] = useState("#FFF");
    const [chooseStroke, setChooseStroke] = useState(5);

    const [mode, setMode] = useState("draw");

    const [visibleColorPopUp, setVisibleColorPopUp] = useState(false);
    const [visibleStrokePopUp, setVisibleStrokePopUp] = useState(false);
    const [visibleBackgroundColorPopUp, setVisibleBackgroundColorPopUp] = useState(false);
    const [visiblePopUp, setVisiblePopUp] = useState(false);


    const handlePanResponderGrant = ({ nativeEvent }) => {
        const { locationX, locationY } = nativeEvent;
        const newPath = `M${locationX},${locationY}`;

        setCurrentPath(newPath);
        setPaths((prevPaths) => [...prevPaths, newPath]);
        colors.push(mode === "draw" ? chooseColor : "#FFF");
        strokes.push(chooseStroke);

    };

    const handlePanResponderMove = ({ nativeEvent }) => {

        if (currentPath === '') return;

        const { locationX, locationY } = nativeEvent;
        const updatedPath = `${currentPath} L${locationX},${locationY}`;
        console.log(locationX)
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

    const save = () => {
        console.log("kaydedildi")
    }

    return (
        <View style={styles.container} {...panResponder.panHandlers}>

            <Modal visible={visibleColorPopUp} transparent={true} animationType={"slide"}>
                <ColorPopUp chooseColor={chooseColor} setChooseColor={setChooseColor} setVisibleColorPopUp={setVisibleColorPopUp} />
            </Modal>

            <Modal visible={visibleStrokePopUp} transparent={true} animationType={"slide"}>
                <StrokePopUp chooseColor={chooseStroke} setChooseStroke={setChooseStroke} setVisibleStrokePopUp={setVisibleStrokePopUp} />
            </Modal>

            <Modal visible={visibleBackgroundColorPopUp} transparent={true} animationType={"slide"}>
                <ColorPopUp chooseColor={bgColor} setChooseColor={setBgColor} setVisibleColorPopUp={setVisibleBackgroundColorPopUp} />
            </Modal>

            <Modal visible={visiblePopUp} transparent={true} animationType={"slide"}>
                <PopUp setVisibleColorPopUp={setVisibleColorPopUp} setVisibleStrokePopUp={setVisibleStrokePopUp} setVisiblePopUp={setVisiblePopUp}
                    handleClear={handleClear} mode={mode} setMode={setMode} save={save} setVisibleBackgroundColorPopUp={setVisibleBackgroundColorPopUp} />
            </Modal>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleClear}>
                    <Text style={styles.buttonText}>Clear All</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => { mode === "draw" ? setMode("eraser") : setMode("draw") }}>
                    <Text style={styles.buttonText}>{mode === "draw" ? "Draw" : "Eraser"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, mode === "eraser" ? { opacity: 0.5 } : null]} onPress={() => {
                    if (mode === "draw") {
                        setVisiblePopUp(false);
                        setVisibleColorPopUp(true)
                    }
                }} activeOpacity={0}>
                    <Text style={styles.buttonText}>Colors</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                    setVisibleStrokePopUp(true);
                    setVisiblePopUp(false);
                }}>
                    <Text style={styles.buttonText}>Stroke</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => { setVisiblePopUp(true); }}>
                    <Text style={styles.buttonText}>Options</Text>
                </TouchableOpacity>
            </View>

            <Svg style={[styles.canvas, { backgroundColor: bgColor, }]}>
                {paths.map((path, index) => (
                    <Path key={index} d={path} stroke={colors[index]} strokeWidth={strokes[index]} fill="none" />
                ))}
            </Svg>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        width: width,
        justifyContent: "space-around",
    },
    button: {
        padding: 10,
        marginTop: 40,
        borderRadius: width * 0.1,
        width: width * 0.18,
        height: width * 0.18,
        backgroundColor: "#EEE",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "lightgray",
    },
    canvas: {
        flex: 8,
        width: width * 0.96,
        margin: width * 0.02,
    },
    buttonText: {
        color: '#555555',
        fontSize: width * 0.033,
        fontWeight: 'bold',
        textAlign: "center",
    },
});