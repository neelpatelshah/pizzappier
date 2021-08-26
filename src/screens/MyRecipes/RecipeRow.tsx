import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { IRecipe as IRecipeData } from "../../utils/Types"

type IRecipe = {
    name: string,
    date: Date,
    recipeData: IRecipeData
}

type Props = {
    recipe: IRecipe
}

const RecipeRow = ({ recipe }: Props) => {
    const { name, date, recipeData } = recipe
    const { finalFlour, finalWater, water, yeast, proof } = recipeData

    const handlePress = () => {
        console.log("pressed")
    }

    return (
        <TouchableHighlight 
            style={styles.container}
            activeOpacity={0.8}
            underlayColor="#f8f8f8"
            onPress={handlePress}
        >
            <View style={styles.layout}>
                <View style={styles.blocks}>
                    <View style={styles.leftBlock}>
                        <Text style={styles.title}>{ name }</Text>
                        <Text style={styles.date}>{ date.toDateString() }</Text>
                    </View>
                    <View style={styles.rightBlock}>
                        <Text>{`${finalFlour}g flour, ${finalWater}g water (${water}%), \n ${yeast} yeast, ${proof}h`}</Text>
                    </View>
                </View>
                <View style={styles.chevron}>
                    <Entypo name="chevron-thin-right" size={15}/>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default RecipeRow;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: "100%",
        padding: 20,
        borderTopWidth: 1,
    },
    layout: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    blocks: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
    },
    date: {
        fontSize: 15,
        color: "#0a0a0a"
    },
    leftBlock: {
        marginRight: 25
    },
    rightBlock: {
        marginRight: 25
    },
    chevron: {
        display: "flex",
        justifyContent: "center",
    }
})
