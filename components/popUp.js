import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get("screen")

const popUp = ({ save, setVisibleColorPopUp, setVisibleStrokePopUp, setVisiblePopUp, setVisibleBackgroundColorPopUp }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonOption} onPress={() => {
                setVisiblePopUp(false);
                setVisibleBackgroundColorPopUp(true);
            }}>
                <Text style={styles.buttonTextOption}>Change BG Color</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonOption} onPress={save}>
                <Text style={styles.buttonTextOption}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonOption} onPress={() => { setVisibleColorPopUp(false); setVisibleStrokePopUp(false); setVisiblePopUp(false); }}>
                <Text style={styles.buttonTextOption}>Close</Text>
            </TouchableOpacity>
        </View >
    )
}

export default popUp

const styles = StyleSheet.create({
    container: {
        marginTop: height * 0.225,
        backgroundColor: "gray",
        borderRadius: 40,
        width: width * 0.75,
        height: height * 0.5,
        marginLeft: width * 0.1250,
        paddingVertical: height * 0.025,
        justifyContent: "space-around",
        paddingVertical: height * 0.03,
    },
    buttonOption: {
        borderRadius: 20,
        width: width * 0.5,
        marginLeft: width * 0.125,
        height: height * 0.1,
        backgroundColor: "#EEE",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "lightgray",
    },
    buttonTextOption: {
        fontSize: width * 0.065,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#555555',
    },
})