import React from 'react'
import IconButton from './IconButton'

type Props = {
    value: number,
    setValue: (value: number) => void
}

const minus = ({value, setValue}: Props) => {

    const handleIncrement = () => {
        if (value > 0)
            setValue(value - 1)
    }

    return (
        <IconButton icon="minus" onPress={handleIncrement}/>
    )
}

export default minus;