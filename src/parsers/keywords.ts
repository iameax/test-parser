import { ParseOptions } from '../index';
import BaseParser from './base'

export const TYPE = 'KEYWORDS';

export default class KeywordsParser extends BaseParser {
  constructor() {
    super(TYPE);
  }

  makeWords(text: string, minWordLength?: number, exclusions?: Array<string>) {
    let words = text.match(/('?\b[\w]+\b)/gm);

    if (!words) {
      return [];
    }

    words = words.map(word => word.toLocaleLowerCase());
    if (minWordLength) {
      words = words.filter(word => word.length >= minWordLength);
    }

    if (exclusions) {
      exclusions = exclusions.map(exl => exl.toLocaleLowerCase());
      words = words.filter(word => !exclusions.includes(word));
    }

    return words;
  };

  /**
   * Returns words map with numbers of occurrences.
   */
  async parseImpl(textContent: string, options: ParseOptions): Promise<{ [word: string]: number }> {
    const words = this.makeWords(textContent, options.minWordLength, options.ignoreWords);

    const result = {};
  
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
    
      if (!result.hasOwnProperty(word)) {
        result[word] = 0;
      }
    
      result[word] = result[word] + 1;
    }
  
    return result;
  }
}