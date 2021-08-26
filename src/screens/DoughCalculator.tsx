import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ingredient from '../components/Ingredient/Ingredient'
import Picker from '../components/Picker'
import YeastButtons from '../components/YeastButtons'
import { IconButton } from '../components/Counter'
import { IOption, IRecipe } from '../utils/Types'
import { stringifyRecipe, unwrapStrigifiedRecipe } from '../utils/functions'

type UpdateFunc = () => void
type UpdateDeps = any[]

const DoughCalculator = () => {
    const [type, setType] = useState("NY")
    const [balls, setBalls] = useState(4)
    const [weight, setWeight] = useState(200)
    const [water, setWater] = useState(0)
    const [salt, setSalt] = useState(0)
    const [sugar, setSugar] = useState(0)
    const [oil, setOil] = useState(0)
    const [proof, setProof] = useState(0)
    const [temp, setTemp] = useState(0)
    const [yeast, setYeast] = useState("")

    const [finalFlour, setFinalFlour] = useState(0)
    const [finalWater, setFinalWater] = useState(0)
    const [finalSalt, setFinalSalt] = useState(0)
    const [finalSugar, setFinalSugar] = useState(0)
    const [finalOil, setFinalOil] = useState(0)
    const [finalYeast, setFinalYeast] = useState(0)

    const [saving, setSaving] = useState(false)
    const [recipeName, setRecipeName] = useState("")
    const [recipes, setRecipes] = useState<Record<string,any>>({})
    const [recipeNames, setRecipeNames] = useState<IOption[]>([])
    const [activeRecipe, setActiveRecipe] = useState<IRecipe>()
    const [activeRecipeName, setActiveRecipeName] = useState("")

    const setIngredients = [setWater, setSalt, setSugar, setOil, setProof, setTemp, setYeast]

    useEffect(() => {
        calculate()
    }, [balls, weight, water, salt, sugar, oil, proof, temp, yeast])

    useEffect(() => {
        setForDoughType()
    }, [type])

    useEffect(() => {
        getRecipes()
    }, [])

    const getRecipes = async () => {
        AsyncStorage.getAllKeys()
            .then(async (keys: string[]) => {
                const recipeOptions = []
                const recipeData: Record<string, any> = {}
                for (let key of keys) {
                    try {
                        const r = await AsyncStorage.getItem(key)
                        if (r) {
                            recipeOptions.push({ label: key, value: key})
                            recipeData[key] = r
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
                setRecipeNames(recipeOptions)
                setRecipes(recipeData)
            })
    }

    const setForDoughType = () => {
        const recipe = doughRecipes[type]
        for (let i = 0; i < setIngredients.length; i += 1) {
            const func = setIngredients[i]
            const amt = recipe[i]
            //@ts-ignore
            func(amt)
        }
    }
    
    const calculate = () => {
        let dough = balls * weight
        const g_salt = dough * (salt / 100)
        const g_oil = dough * (oil / 100)
        const g_sugar = dough * (sugar / 100)
        const g_yeast = dough * yeastFactor[yeast]
        const remaining = dough - g_salt - g_sugar - g_oil - g_yeast
        const g_flour = remaining / (1 + (water / 100))
        const g_water = g_flour * (water / 100)

        setFinalFlour(g_flour)
        setFinalWater(g_water)
        setFinalSalt(g_salt)
        setFinalSugar(g_sugar)
        setFinalOil(g_oil)
        setFinalYeast(g_yeast)
    }

    const useUpdate = (func: UpdateFunc, deps: UpdateDeps) => {
        const ref = useRef(false)
        if (ref.current) func()
        else ref.current = true

    }
    
    const handleSave = () => {
        setSaving(true)
    }

    const handleRecipeSave = async () => {
        const recipe: IRecipe = {
            type,
            balls,
            weight,
            water,
            salt,
            sugar,
            oil,
            proof,
            temp,
            yeast,
            finalFlour,
            finalWater,
            finalSalt,
            finalSugar,
            finalOil,
            finalYeast
        }
        try {
            await AsyncStorage.setItem(`RECIPE_${recipeName}`, JSON.stringify(recipe))
        } catch (err) {
            console.log(err)
        } finally {
            const tempRN = recipeNames
            let tempR: Record<string, any> = recipes
            tempRN.push({ label: recipeName, value: recipeName })
            tempR[recipeName] = recipe
            setRecipeNames(tempRN)
            setRecipes(tempR)
            setSaving(false)
            setRecipeName("")
        }
    }

    const handleSelectRecipe = (value: string) => {
        const selected = recipes[value]
        setActiveRecipeName(value)
        setActiveRecipe(selected)
    }

    return (
        <View>
            <View>
                <Picker 
                    options={doughOptions}
                    style={styles.doughType}
                    value={type}
                    setValue={setType}
                />
                <View style={styles.ingredientRow}>
                    <Ingredient 
                        name="balls"
                        infoText=""
                        unit={units["none"]}
                        value={balls}
                        setValue={setBalls}
                    />
                    <Ingredient 
                        name="weight"
                        infoText=""
                        unit={units["grams"]}
                        value={weight}
                        setValue={setWeight}
                    />
                </View>
                <View style={styles.ingredientRow}>
                    <Ingredient 
                        name="water"
                        infoText=""
                        unit={units["percent"]}
                        value={water}
                        setValue={setWater}
                    />
                    <Ingredient 
                        name="salt"
                        infoText=""
                        unit={units["percent"]}
                        value={salt}
                        setValue={setSalt}
                    />
                </View>
                <View style={styles.ingredientRow}>
                    <Ingredient 
                        name="sugar"
                        infoText=""
                        unit={units["percent"]}
                        value={sugar}
                        setValue={setSugar}
                    />
                    <Ingredient 
                        name="oil"
                        infoText=""
                        unit={units["percent"]}
                        value={oil}
                        setValue={setOil}
                    />
                </View>
                <View style={styles.ingredientRow}>
                    <Ingredient 
                        name="proof time"
                        infoText=""
                        unit={units["none"]}
                        value={proof}
                        setValue={setProof}
                    />
                    <Ingredient 
                        name="temperature"
                        infoText=""
                        unit={units["fahrenheit"]}
                        value={temp}
                        setValue={setTemp}
                    />
                </View>
                <YeastButtons value={yeast} setValue={setYeast}/>
            </View>
            <View style={styles.recipe}>
                <View>
                    <Text> Flour: {finalFlour}</Text>
                    <Text> Water: {finalWater}</Text>
                    <Text> Salt: {finalSalt}</Text>
                    <Text> Sugar: {finalSugar}</Text>
                    <Text> Oil: {finalOil}</Text>
                    <Text> Yeast: {finalYeast}</Text>
                </View>
                <IconButton icon="content-save" onPress={handleSave}/>
            </View>
            {saving && (
                <View style={styles.recipe}>
                    <TextInput 
                        onChangeText={setRecipeName}
                        value={recipeName}
                        placeholder="recipe name"
                        style={styles.recipeNameInput}
                    />
                    <IconButton icon="content-save" onPress={handleRecipeSave}/>
                </View>
            )}
            {/* <Picker 
                options={recipeNames}
                style={styles.doughType}
                value={activeRecipeName}
                setValue={handleSelectRecipe}
            /> */}
        </View>
    )
}

export default DoughCalculator;

const styles = StyleSheet.create({
    ingredientRow: {
        margin: 25,
        display: "flex",
        flexDirection: "row"
    },
    doughType: {
        display: "flex",
        justifyContent: "center"
    },
    recipe: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    recipeNameInput: {
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center"
    }
})

const units: Record<string, string> = {
    none: "",
    grams: "g",
    percent: "%",
    celcius: "°C",
    fahrenheit: "°F"
}

const yeastFactor: Record<string, number> = {
    active: 0.02,
    instant: 0.02,
    fresh: 0.1
}

const doughOptions: IOption[] = [
    { label: "NY Style", value: "NY" },
    { label: "Neopolitan", value: "NEO" },
    { label: "Bready and Bad", value: "BAD" },
]

const doughRecipes: Record<string, Array<string | number>> = {
    NY: [62, 3, 2, 3, 48, 40, "active"],
    NEO: [60, 3, 0, 3, 72, 40, "fresh"],
    BAD: [69, 69, 69, 69, 69, 69, "instant"]
}
