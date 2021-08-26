import { IRecipe } from "./Types";

export const stringifyRecipe = (recipe: IRecipe) => {
    const recipeArr = Array.from(Object.values(recipe))
    const recipeStr = recipeArr.map(ing => `${ing.toString()},`).join("")
    return recipeStr
}

export const unwrapStrigifiedRecipe = (recipeStr: string) => {
    const ings = recipeStr.split(",")
    // const recipe: IRecipe = {
    //     type: ings[0],
    //     balls: parseInt(ings[1]),
    //     weight: parseInt(ings[2]),
    //     water: parseInt(ings[3]),
    //     salt: parseInt(ings[4]),
    //     sugar: parseInt(ings[5]),
    //     oil: parseInt(ings[6]),
    //     proof: parseInt(ings[7]),
    //     temp: parseInt(ings[8]),
    //     yeast: ings[9],
    //     finalFlour: parseInt(ings[10]),
    //     finalWater: parseInt(ings[11]),
    //     finalSalt: parseInt(ings[12]),
    //     finalSugar: parseInt(ings[13]),
    //     finalOil: parseInt(ings[14]),
    //     finalYeast: parseInt(ings[15])
    // }
    const recipe: IRecipe = JSON.parse(recipeStr)
    return recipe
}