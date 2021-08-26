import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native'

import { IRecipe as IRecipeData } from "../../utils/Types"
import RecipeRow from './RecipeRow'

type Props = {
    
}

type IRecipe = {
    name: string,
    date: Date,
    recipeData: IRecipeData
}

const recipeMocks = () => {
    const mocks: IRecipe[] = []
    const mockRecipe = {
        type: "NY",
        balls: 1,
        weight: 1,
        water: 1,
        salt: 1,
        sugar: 1,
        oil: 1,
        proof: 1,
        temp: 1,
        yeast: "fresh",
        finalFlour: 1,
        finalWater: 1,
        finalSalt: 1,
        finalSugar: 1,
        finalOil: 1,
        finalYeast: 1
    }
    for (let i = 0; i < 15; i += 1)  {
        let mock = {
            name: `numero ${i}`,
            date: new Date("01/01/2021"),
            recipeData: mockRecipe
        }
        mocks.push(mock)
    }
    return mocks
}

const MyRecipes = ({}: Props) => {
    const [recipes, setRecipes] = useState<IRecipe[]>([])

    useEffect(() => {
        setRecipes(recipeMocks())
    }, [])

    const renderItem = (recipe: any) => {
        return <RecipeRow recipe={recipe.item} />
    }

    return (
        <SafeAreaView style={styles.container}>
           <FlatList
                data={recipes}
                renderItem={renderItem}
                keyExtractor={item => item.name}
           />
        </SafeAreaView>
    )
}

export default MyRecipes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        width: "100%"
    }
})
