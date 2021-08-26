import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker as RNPicker } from '@react-native-picker/picker'

import { IOption } from "../utils/Types"

type Props = {
    options: IOption[],
    value: string,
    setValue: (value: string) => void
    style?: any,
}

const Picker = ({ options, value, setValue, style }: Props) => {
    return (
        <View style={[styles.container, style]}>
            <RNPicker
                selectedValue={value}
                onValueChange={(v: string, i) => {
                    setValue(v)
                }}
            >
                {options.map((option: IOption, key) => {
                    return <RNPicker.Item label={option.label} value={option.value}/>
                })}
            </RNPicker>
        </View>
    )
}

export default Picker;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        width: "100%",
        height: 35,
        justifyContent: "center"
    }
})
