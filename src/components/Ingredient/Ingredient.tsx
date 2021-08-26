import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Counter from '../Counter'

type Props = {
    name: string,
    infoText: string,
    unit: string,
    value: number,
    setValue: (value: number) => void
}

const Ingredient = ({name, infoText, unit, value, setValue}: Props) => {
    return (
        <View style={styles.container}>
            <Text> { name } </Text>
            <Counter value={value} setValue={setValue} unit={unit}/>
        </View>
    )
}

export default Ingredient;

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
    number: {
        fontSize: 30
    }
})