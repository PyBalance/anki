// Function to get data for a given character
function getCharacterData(character: string): any {
    try {
        return require(`hanzi-writer-data/${character}`);
    } catch (error) {
        console.error(`Data not found for character: ${character}`, error);
        return null;
    }
}

// Function to combine data for a string of characters
function combineCharactersData(characters: string): string {
    const dataArray = Array.from(characters).map(char => getCharacterData(char)).filter(data => data !== null);
    console.log(dataArray);
    return JSON.stringify(dataArray);
}

export default combineCharactersData;