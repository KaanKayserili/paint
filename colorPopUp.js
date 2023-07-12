import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const ColorPopUp = ({ chooseColor, setChooseColor, setVisibleColorPopUp }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text>Choose Color</Text>

                <Image source={require("./assets/favicon.png")} style={{ width: 200, heigth: 200 }} />

                <TextInput value={chooseColor} onChangeText={(chooseColor) => { setChooseColor((prevSetChooseColor) => prevSetChooseColor = chooseColor) }} />

                <TouchableOpacity onPress={() => { setVisibleColorPopUp(false) }}>
                    <Text>Okay</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ColorPopUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        backgroundColor: "#FFFFAA",
        borderRadius: 20,
        alignItems: "center",
        padding: 50
    },
})