import CharGroup from "./CharGroup"
import './Char.css';

type charsDataType = {
    [char: string]: string
}
export default function CharQuiz({ charsData }: { charsData: charsDataType }) {
    return (
        <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {Object.keys(charsData).map((char, index) => (
                    <CharGroup chars={char} pinyins={charsData[char]} isQuiz={true} key={index} />
                ))}
            </div>
            <br />
            <div className="afterpage" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {Object.keys(charsData).map((char, index) => (
                    <CharGroup chars={char} pinyins={charsData[char]} isQuiz={false} key={index} />
                ))}
            </div>
        </div>
    )
}
