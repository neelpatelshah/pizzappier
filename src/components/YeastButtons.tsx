import React from 'react'
import { TouchableHighlight, View, StyleSheet, Text } from 'react-native'

type Props = {
    value: string,
    setValue: (value: string) => void
}

const YeastButtons = ({value, setValue}: Props) => {

    const handleActive = () => {
        setValue("active")
    }
    const handleInstant = () => {
        setValue("instant")
    }
    const handleFresh = () => {
        setValue("fresh")
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={"#f8f8f8"}
                style={{backgroundColor: value === "active" ? "#c6c6c6" : "#fff"}}
                onPress={handleActive} 
            >
                <Text> active </Text>
            </TouchableHighlight>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={"#f8f8f8"}
                style={{backgroundColor: value === "instant" ? "#c6c6c6" : "#fff", marginHorizontal: 40}}
                onPress={handleInstant} 
            >
                <Text> instant </Text>
            </TouchableHighlight>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={"#f8f8f8"}
                style={{backgroundColor: value === "fresh" ? "#c6c6c6" : "#fff"}}
                onPress={handleFresh} 
            >
                <Text> fresh </Text>
            </TouchableHighlight>
        </View>
    )
}

export default YeastButtons;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        borderWidth: 1,
        borderRadius: 3

    }
})
