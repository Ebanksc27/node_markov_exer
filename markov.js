/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
  
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
  
      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      this.chains[word].push(nextWord);
    }
  }
  
  /** return random text from chains */

  makeText(numWords = 100) {
    let words = [choice(Object.keys(this.chains))];
    while (words.length < numWords && words[words.length - 1] !== null) {
      let lastWord = words[words.length - 1];
      let nextWords = this.chains[lastWord];
      let randomNextWord = choice(nextWords);
      words.push(randomNextWord);
    }
    return words.join(" ").replace(/ null$/, "");
  }
  
}

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = MarkovMachine;