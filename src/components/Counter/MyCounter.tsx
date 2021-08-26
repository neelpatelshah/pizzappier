import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Plus from "./Plus"
import Minus from "./Minus"

type Props = {
    value: number,
    setValue: (value: number) => void
    unit?: string,
}

const MyCounter = ({value, setValue, unit}: Props) => {
    return (
        <View style={styles.container}>
            <Minus value={value} setValue={setValue} />
            <Text style={styles.number}> { `${value}${unit || ""}` } </Text>
            <Plus value={value} setValue={setValue} />
        </View>
    )
}

export default MyCounter;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    number: {
        fontSize: 30
    }
})
