'use client'
import { createBtnSize, layoutOfMnemonic, layoutOfSpacing } from "@/config/map";
import { Button, Card, CardBody, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbArrowsTransferDown } from "react-icons/tb";

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
            <SimpleGrid columns={layoutOfMnemonic} spacing={layoutOfSpacing}>
              {words.map((word, index) => (
                <Button size={createBtnSize} key={index} colorScheme={type === 'to' ? "messenger" : "twitter"} className="min-w-full" onClick={() => handleClickFn(index)}>
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
          <TbArrowsTransferDown size="1.4rem" color="gray" />
        </div>
        {WordWrapper(selectedWord, "to")}
      </div>
    </div>
  </>
}

export default CheckWord
