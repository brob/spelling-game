import { useState } from "react"
import { readWord } from '@base/utils/readWord';

export function WordInput({word, setWord, getWord, setScore, setHistory, success, setSuccess}) {

    function wordCheck(event) {
        event.preventDefault()
        const input = event.target[0].value.toLowerCase()
        const isRight = input === word.word.toLowerCase()
        const score = isRight ? 1 : 0
        setScore((prevScore) => prevScore + score)
        console.log(isRight)
        setSuccess(isRight ? 'Correct!' : 'Incorrect!')
        setHistory((prevHistory) => [...prevHistory, {word: word.word, success: isRight}])
    }
    function clearSuccess() {
        setSuccess(null)
    }
    function newWord() {
        clearSuccess()
        setWord(getWord())
        const word = getWord()
        readWord(word)
        console.log({word})

    }
    return (
        <>
        {success && <h3 className="text-2xl font-bold mb-4">{success}: {word.word}</h3>}
        {success && <button onClick={newWord} className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">Next Word</button>}

        {!success &&  <form onSubmit={wordCheck} className="flex items-center">
            <input type="text" className="border-2 border-blue-500 rounded-lg p-2 mr-4 text-xl" />
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Submit</button>
        </form>}

        </>
    )
}