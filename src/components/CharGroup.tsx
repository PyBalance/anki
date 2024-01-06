import Char from './Char'
import './Char.css'; // 假设你的样式文件名为 CharacterComponent.css
// 你好 -> [你 好] nǐ hǎo -> [nǐ hǎo]
export default function CharGroup({chars,pinyins,isQuiz=false}:{chars:string,pinyins:string,isQuiz?:boolean}){
    return(
        isQuiz?
        <div className='char-group'>
            {chars.split('').map((char,index)=>(
                <Char character="" pinyin={pinyins.split(' ')[index]} key={index}/>
            ))}
        </div>
        :
        <div className='char-group'>
            {chars.split('').map((char,index)=>(
                <Char character={char} pinyin={pinyins.split(' ')[index]} key={index}/>
            ))}
        </div>
    )
}