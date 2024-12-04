import { useEffect, useState } from "react"
import { WordInput } from "./WordInput"
import { readWord } from "@base/utils/readWord.mjs"

import Modal from "react-modal"

function HistoryButton({ history }) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true)
    }

    function closeModal() {
        setModalIsOpen(false)
    }

    return (
        <div>
            <button onClick={openModal} className="history-button bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">
                Show History
            </button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="History Modal">
                <h2 className="text-2xl font-bold mb-4">History</h2>
                <button onClick={closeModal} className="close-modal-button bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                    Close
                </button>
                <ul className="history-list mt-4">
                    {history.map((item, index) => (
                        <li key={index} className="history-item mb-2">
                            <span className="word font-bold">{item.word}</span>: <span className="success">{item.success ? "Success" : "Fail"}</span>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    )
}



export function Game({wordList}) {
    const [score, setScore] = useState(0)
    const [word, setWord] = useState('')
    const [success, setSuccess] = useState(null)
    const [history, setHistory] = useState([])
    useEffect(() => {
        handleRead(word.word)
    },[word])
    function getWord() {
        const randomIndex = Math.floor(Math.random() * wordList.length)

        
        setWord(wordList[randomIndex])
        console.log({word})

    }
    function handleRead(string) {
        readWord(string)
    }
    return (
        <div className="game-board bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex justify-between">
                <h2 className="score text-2xl font-bold mb-4">Score: {score}</h2>
                {history && <HistoryButton history={history} />}

            </div>
            {!word && <button className="get-word-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={getWord}>Get Word</button>}
            {word && (
                <div className="word-card bg-white p-4 rounded-lg shadow-md mb-4">
                    <h3 className="text-lg font-bold mb-2">Definition</h3>
                    <p className="mb-2">{word.definition}</p>
                    <h3 className="text-lg font-bold mb-2">Grade Level: {word["Grade level"]}</h3>
                    


                    <WordInput setSuccess={setSuccess} success={success} setHistory={setHistory} setScore={setScore} word={word} setWord={setWord} getWord={getWord} />
                    { !success && <div className="mt-6"><button onClick={() => handleRead(word.sentence)} className="read-sentence-button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-2">
                        Read a Sentence
                    </button>
                    <button onClick={() => handleRead(word.word)} className="replay-word-button bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700">
                        Replay Word
                    </button></div>}
                    
                </div>
            )}

        </div>
    )
}