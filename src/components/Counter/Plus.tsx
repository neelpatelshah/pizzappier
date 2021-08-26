import React from 'react'
import IconButton from './IconButton'

type Props = {
    value: number,
    setValue: (value: number) => void
}

const Plus = ({value, setValue}: Props) => {

    const handleIncrement = () => {
        setValue(value + 1)
    }

    return (
        <IconButton icon="plus" onPress={handleIncrement}/>
    )
}

export default Plus;