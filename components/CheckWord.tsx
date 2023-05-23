'use client'
import { layoutOfMnemonic } from "@/config/map";
import { Button, Card, CardBody, SimpleGrid } from "@chakra-ui/react";
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
    if (words.length === 0) {
      return <></>
    }
    return (
      <>
        <Card className="w-full">
          <CardBody>
            <SimpleGrid columns={layoutOfMnemonic} spacing={10}>
              {words.map((word, index) => (
                <Button key={index} colorScheme={type === 'to' ? "messenger" : "gray"} className="min-w-full" onClick={() => handleClickFn(index)}>
                  {word}
                </Button>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>
      </>
    )
  }

  return <>
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center border border-gray-300 rounded-lg w-full p-4">
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
