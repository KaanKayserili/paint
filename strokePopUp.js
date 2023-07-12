import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const ColorPopUp = ({ chooseStroke, setChooseStroke, setVisibleStrokePopUp }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text>Slide Stroke</Text>

                <Image source={require("./assets/favicon.png")} style={{ width: 200, heigth: 200 }} />

                <TextInput value={chooseStroke} onChangeText={(chooseStroke) => { setChooseStroke((prevSetChooseStroke) => prevSetChooseStroke = chooseStroke) }} />

                <TouchableOpacity onPress={() => { setVisibleStrokePopUp(false) }}>
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