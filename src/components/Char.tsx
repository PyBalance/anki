import React from 'react';
import './Char.css'; // 假设你的样式文件名为 CharacterComponent.css

// 这是你的单字组件
const CharacterComponent = ({ character, pinyin }: { character: string, pinyin: string }) => {
  return (
    <div className="character-container">
      <div className="pinyin">{pinyin}</div>
      <div className="character" >
        {character.length>1?character[0]:character}
      </div>
    </div>
  );
};

export default CharacterComponent;
