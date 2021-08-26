import React from 'react'
import { TouchableHighlight } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"

type Props = {
    icon: any,
    onPress: (value: any) => void
}

const IconButton = ({icon, onPress}: Props) => {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f8f8f8"
            onPress={onPress}
        >
            <MaterialCommunityIcons
                name={icon}
                size={35}
            />
        </TouchableHighlight>
    )
}

export default IconButton;