'use client'
import { Button } from "@tremor/react";
import { useEffect, useState } from "react";

interface CheckWordProps {
  word: string[];
  onSuccess?: (word: string[]) => void;
  onFail?: (word: string[]) => void;
}
const CheckWord: React.FC<CheckWordProps> = ({ word, onFail, onSuccess }) => {
  const [randomWord, setRandomWord] = useState<string[]>([])
  const [selectedWord, setSelectedWord] = useState<string[]>([])

  const clickRandomWord = (index: number) => {
    const targetWord = randomWord[index]
    setRandomWord(randomWord.slice().filter((_, i) => i !== index))
    setSelectedWord([...selectedWord, targetWord])
  }

  const clickSelectWord = (index: number) => {
    const targetWord = selectedWord[index]
    setSelectedWord(selectedWord.slice().filter((_, i) => i !== index))
    setRandomWord([...randomWord, targetWord])
  }

  useEffect(() => {
    const randomOrderedWord = word.slice().sort(() => Math.random() - 0.5).slice()
    setRandomWord(randomOrderedWord)
  }, [word])

  useEffect(() => {
    if (randomWord.length === 0 && selectedWord.length === word.length) {
      if (selectedWord.join(' ') === word.join(' ')) {
        onSuccess && onSuccess(selectedWord)
      } else {
        onFail && onFail(selectedWord)
      }
    }
  }, [randomWord])

  const WordWrapper = (words: string[], type: "from" | "to") => {
    const handleClickFn = type === "from" ? clickRandomWord : clickSelectWord
    const className = type === "from" ? "w-full p-4 bg-indigo-100 border border-indigo-300 rounded-md" : "w-full p-4 bg-orange-100 border border-orange-300 rounded-md"
    if (words.length === 0) {
      return <></>
    }
    return (
      <>
        <section className={className} style={{ 'minHeight': '192px' }}>
          <div className="flex flex-wrap flex-row">
            {words.map((word, index) => (
              <div key={index} className="w-1/3 mb-2 px-2">
                <Button className="min-w-full" onClick={() => handleClickFn(index)}>
                  {word}
                </Button>
              </div>
            ))}
          </div>
        </section>
      </>
    )
  }

  return <>
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center border border-gray-300 rounded-lg">
        {WordWrapper(randomWord, "from")}
        <div className="my-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 25" width="50" height="25">
            <path d="M25,25 L0,0 L50,0 Z" fill="#d3d3d3" />
          </svg>
        </div>
        {WordWrapper(selectedWord, "to")}
      </div>
    </div>
  </>
}

export default CheckWord
