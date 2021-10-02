 const getWord = async () => {
    // Get the word and the hint from an external api
    const res = await fetch('https://random-words-api.vercel.app/word');
    const data = await res.json();
    return { word: data[0].word.toLowerCase(), hint: data[0].definition };
  };

  export default getWord;