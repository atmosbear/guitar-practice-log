import React, { useState } from "react"
import { createRoot } from "react-dom/client"

const buttonStyle = "ml-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-400"
const spanStyle = "font-bold text-blue-600"
const PlayEveryDiatonicChordQuestion = ({ keyName, getNewKey }) => {
  return <li className="mb-4">
    Play every diatonic chord in the key of <span className={spanStyle}>{keyName}</span>
    <button onClick={getNewKey} className={buttonStyle}>Get New Key</button>
  </li>

}

const PlayChordProgressionQuestion = ({ currentKey, text }) => {
  const getRandomChordProgression = (length) => {
    const options = ["I", "ii", "iii", "IV", "V", "vi", "viidim", "V7"]
    return ["I "].concat(Array(length).fill(null).map(o => options[Math.floor(Math.random() * options.length)]).join(" "))
  }
  const [length, setLength] = useState(3)
  const [chordProgression, setChordProgression] = useState(getRandomChordProgression(length))
  return <li>
    Play {text} in the key of {currentKey}:  <span className={spanStyle}>{chordProgression}</span>
    <button onClick={() => { setChordProgression(getRandomChordProgression(length)) }} className={buttonStyle}>Get New Chord Progression</button>
  </li>
}

const PlayMelodyQuestion = ({ keyName, text, extraOneOrTwo } = { extraOneOrTwo: "", keyName: "", text: "" }) => {
  const getRandomMelody = (length: number) => {
    const options = ["do", "re", "mi", "fa", "so", "la", "ti", "do'"]
    return Array(length).fill(null).map(o => options[Math.floor(Math.random() * options.length)]).join(" ")
  }

  const getExtra1 = () => {
    return `, but integrate in three of the following: ${createTechniqueList()}`
  }

  const getExtra2 = () => {
    return `, but double it up using ${["thirds", "sixths"][Math.floor(Math.random() * 2)]}`
  }

  const [length, setLength] = useState(8)
  const [melody, setMelody] = useState(getRandomMelody(length))
  const [extra1, setExtra1] = useState(getExtra1())
  const [extra2, setExtra2] = useState(getExtra2())
  const content = extraOneOrTwo === "1" ? <>In the key of {keyName}, play {text}: <span className={spanStyle}>{melody}</span>{extra1}
    <button onClick={() => { setMelody(getRandomMelody(length)) }} className={buttonStyle}>Get New Melody</button>
    <button onClick={() => { setExtra1(getExtra1()) }} className={buttonStyle + ` ${extra1 ? "" : "hidden"}`}>Get New Techniques</button>
    <br />
  </>

    : extraOneOrTwo === "2" ?
      <li>
        In the key of {keyName}, play {text}: <span className={spanStyle}>{melody}</span>{extra2}
        <button onClick={() => { setMelody(getRandomMelody(length)) }} className={buttonStyle}>Get New Melody</button>
        <button onClick={() => { setExtra2(getExtra2()) }} className={buttonStyle + ` ${extra2 ? "" : "hidden"}`}>Get New Intervals</button>
      </li>

      : <>In the key of {keyName}, play {text}: <span className={spanStyle}>{melody}</span>
        <button onClick={() => { setMelody(getRandomMelody(length)) }} className={buttonStyle}>Get New Melody</button></>
  return (
    content
  )
}

const createTechniqueList = () => {
  const basicListOfTechniques = ["hammer-ons", "pull-offs", "legato", "staccato", "slide", "dynamics", "harmonics", "syncopation", "string slap", "palm muting", "fret hand muting", "vibrato", "string rake", "string bend", "random guitar body hit"]
  const currentListOfTechniques: string[] = []
  const length = 3
  const findAndReplace = (findWhat, inWhat, replaceWithWhat) => {
    const index = inWhat.indexOf(findWhat)
    if (index === -1) {
      return
    } else {
      inWhat[index] = replaceWithWhat
      return inWhat
    }
  }
  for (let i = 0; i < length; i++) {
    const technique = basicListOfTechniques[Math.floor(Math.random() * basicListOfTechniques.length)]
    currentListOfTechniques.push(technique)
    basicListOfTechniques.splice(basicListOfTechniques.indexOf(technique), 1)
  }
  if (currentListOfTechniques.includes("dynamics")) {
    const possibleDynamics = ["forte", "piano", "fortissimo", "pianissimo", "crescendo", "decrescendo"]
    const getRandomDynamic = () => { const d = possibleDynamics[Math.floor(Math.random() * 4)]; possibleDynamics.splice(possibleDynamics.indexOf(d), 1); return d }
    findAndReplace("dynamics", currentListOfTechniques, "[two dynamics: " + getRandomDynamic() + " and " + getRandomDynamic() + "]")
  } else if (currentListOfTechniques.includes("hammer-ons")) {
    const possibleHammerOns = ["consecutive hammer-ons", "detached hammer-ons"]
    const getRandomHammerOn = () => possibleHammerOns[Math.floor(Math.random() * 2)]
    findAndReplace("hammer-ons", currentListOfTechniques, getRandomHammerOn())
  } else if (currentListOfTechniques.includes("pull-offs")) {
    const possiblePullOffs = ["consecutive pull-offs", "detached pull-offs"]
    const getRandomPullOff = () => possiblePullOffs[Math.floor(Math.random() * 2)]
    findAndReplace("pull-offs", currentListOfTechniques, getRandomPullOff())
  }
  return currentListOfTechniques.join(", ")
}
const App = () => {
  let knownKeys = ["C", "G"]
  const getRandomKey = () => {
    return knownKeys[Math.floor(Math.random() * knownKeys.length)]
  }
  const [currentKey, setCurrentKey] = useState(getRandomKey())

  const handleGetNewKey = () => {
    setCurrentKey(getRandomKey())
  }

  const Notes = () => {
    return <textarea className="w-full h-32 p-4 mt-4 text-lg text-gray-700 bg-gray-900  border-blue-900 rounded shadow-sm resize-none focus:ring-blue-500 focus:border-blue-500 border outline-none" placeholder="notes..."></textarea >
  }

  const ExportButton = () => {
    const print = () => {
      window.print()
    }
    return <button className={buttonStyle.replace("text-white", "text-black").replace("bg-blue-500", "bg-red-400").replace("hover:bg-blue-400", "hover:bg-red-300")} onClick={print}>Export</button>
  }

  return <>
    <div className="text-white bg-blue-900 p-6 text-2xl font-bold">Practice Log</div>
    <ol className="p-6 space-y-4">
      <div className="text-white text-2xl font-bold">
        Date: <input type="date" className={"p-2 text-lg text-white bg-gray-900  border-blue-900 rounded shadow-sm resize-none focus:ring-blue-500 focus:border-blue-500 border outline-none"}></input>
      </div>
      <div>
        Time Spent (minutes): <input type="number" className={"p-2 text-lg text-white bg-gray-900  border-blue-900 rounded shadow-sm resize-none focus:ring-blue-500 focus:border-blue-500 border outline-none"}></input>
      </div>
      <PlayEveryDiatonicChordQuestion keyName={currentKey} getNewKey={handleGetNewKey}></PlayEveryDiatonicChordQuestion>
      <Notes />
      <PlayMelodyQuestion keyName={currentKey} text={"this random melody"} extraOneOrTwo=""></PlayMelodyQuestion>
      <Notes />
      <PlayChordProgressionQuestion currentKey={currentKey} text={"this random chord progression"}></PlayChordProgressionQuestion>
      <Notes />
      <PlayMelodyQuestion keyName={currentKey} text={"this random melody with a bass note accompaniment"} extraOneOrTwo=""></PlayMelodyQuestion>
      <Notes />
      <PlayChordProgressionQuestion currentKey={currentKey} text={"an improvisation with bass notes around this chord progression"}></PlayChordProgressionQuestion>
      <Notes />
      <PlayMelodyQuestion keyName={currentKey} text={"this random melody"} extraOneOrTwo="1" />
      <Notes />
      <PlayMelodyQuestion keyName={currentKey} text={"this random melody"} extraOneOrTwo="2" />
      <Notes />
      <ExportButton />
    </ol >
  </>
}
createRoot(document.getElementById("root")).render(<App />)
