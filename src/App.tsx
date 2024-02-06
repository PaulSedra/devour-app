import React, { useEffect, useState } from "react"

const URL = "https://api.spoonacular.com/recipes/complexSearch?query="
const headers = {  // variable name must remain lowercase
    "Content-Type": "application/json",
    "x-api-key": "875b5297fbf24c268816487846cecc9f",
}
const App: React.FC = () => {

    const [ rng, setRng ] = useState("-1")

    const [ title, setTitle ] = useState("")
    const [ data, setData ] = useState("")
    const [ error, setError ] = useState("")

    useEffect(() => {

        if ( rng==="-1" ) return

        const PARAMS = `&cuisine=&excludeCuisine=&diet=&intolerances=&includeIngredients=&excludeIngredients=&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&maxReadyTime=30&ignorePantry=true&sort=min-missing-ingredients&sortDirection=asc&offset=${rng}&number=1`

        fetch(URL+PARAMS, { headers })
            .then(async response => {
                const data = await response.json()
                console.log(response)
                console.log(data)
                setTitle("Dish: " + data.results[0].title)
                setData(JSON.stringify(data))
            })
            .catch( err => { //! NOT TESTED
                console.warn(err)
                setError(JSON.stringify(err))
            })

    }, [rng, setRng])

    return (
        <div>
            <div>
                Hello from React!
            </div>
            <button
                onClick={ () => setRng(String(Math.round(Math.random()*100))) }
            > CLICK ME! </button>
            <div>{title}</div>
            <div>{data}</div>
            <div>{error}</div> {/*!NOT TESTED*/}
        </div>
    )
}

export default App