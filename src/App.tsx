import React from "react";
import "./App.css";
import "./components/Char.css";
import DuoyinziForm from "./components/DuoyinziForm";
import CiyuInput from "./components/CiyuInput";
import cnchar from "cnchar";
import { useState } from "react";
import { Button } from "antd";
import CharQuiz from "./components/CharQuiz";
type Options = { [key: string]: string[] };
function App() {
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showChars, setShowChars] = useState(false);
  const [quizValues, setQuizValues] = useState({});
  
  
  function splitInput(input: string) {
    //split input into array of words by space newline comma or semicolon
    const words = input.split(/[ ，,;\n]+/);
    //remmve empty strings from array
    const filteredWords = words.filter((word) => word);
    return filteredWords;
  }


  // Function to get pinyin of words
  function getPinyinOfWord(word: string): string[] {
    return cnchar.spell(word, "array", "low", "poly", 'tone') as string[];
  }

  // Function to generate new results from part of a word
  function generateNewResults(results: string[], part: string): string[] {
    let newResults: string[] = [];
    if (part.includes("|")) {
      const parts = part.replace(/\(|\)/g, "").split("|");
      results.forEach((res) => {
        parts.forEach((p) => {
          newResults.push(`${res} ${p}`);
        });
      });
    } else {
      results.forEach((res) => {
        newResults.push(`${res} ${part}`);
      });
    }
    return newResults;
  }

  // Main function to get Pinyin
  function getPinyin(words: string[]): Options {
    // Initialize empty object to hold results
    let results: Options = {};

    // Loop through each word
    words.forEach((word) => {
      // Get pinyin for the word
      const pinyin = getPinyinOfWord(word);

      // Create an array to hold all combinations of the word
      let wordCombinations: string[] = [''];

      // Generate all combinations of the word
      pinyin.forEach((part) => {
        // Replace the old results array with the new one generated from each part of current word
        wordCombinations = generateNewResults(wordCombinations, part);
      });

      // Remove leading space from each combination and add the word and its combinations to results
      let trimmedWordCombinations = wordCombinations.map((res) => res.trim());
      results[word] = trimmedWordCombinations;
    });

    return results;
  }
  //quizValue change will set showChars to true

  const quizPage = showChars ?
    <>
    <Button className="no-print" onClick={() => { setShowChars(false); setShowResults(true); }}>返回</Button>
    <CharQuiz charsData={quizValues} />
    </>
    :null;


  return (
    <div>
      {!showChars && <h1 className="App-header">看拼音背词语</h1>}
      {!showChars && <CiyuInput setinput={setInputValue} setshow={setShowResults} />}
      {showResults && !showChars && <DuoyinziForm options={getPinyin(splitInput(inputValue))} setQuizValues={setQuizValues} setShowChars={setShowChars}/>}
      {quizPage}
    </div>
  );
}

export default App;
