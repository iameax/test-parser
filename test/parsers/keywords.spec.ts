import { expect, assert } from 'chai';
import KeywordsParser from '../../src/parsers/keywords';
import 'mocha';
import { getTextContent } from '../../src/utils';

const parser = new KeywordsParser();

const text = `Lorem ipsum dolor sit amet, amet consectetur adipiscing elit, sed do eiusmod tempor dolor incididunt ut labore et dolore magna aliqua.`;

describe('Keywords Parser', () => {
  describe('Options', () => {
    it('ignoreWords: Should ignore options.ignoreWords words', async () => {
      const ignoredWords = ['dolor', 'amet', 'Lorem'];
      const result = await parser.parse(text, { ignoreWords: ignoredWords });

      expect(result).not.contain.any.keys(['dolor', 'amet', 'Lorem']);
    });

    it('maxTextLength: Should limit the text to options.maxTextLength characters', async () => {
      const result = await parser.parse(text, { maxTextLength: 60 });
      const expected = {
        Lorem: 1,
        ipsum: 1,
        dolor: 1,
        sit: 1,
        amet: 2,
        consectetur: 1,
        adipiscing: 1,
        elit: 1,
      };

      expect(result).eql(expected);
    });

    it('minWordLength: Should ignore words with length less than options.minWordLength', async () => {
      const result = await parser.parse(text, { minWordLength: 3 });
      const expected = {
        Lorem: 1,
        adipiscing: 1,
        aliqua: 1,
        amet: 2,
        consectetur: 1,
        dolor: 2,
        dolore: 1,
        eiusmod: 1,
        elit: 1,
        incididunt: 1,
        ipsum: 1,
        labore: 1,
        magna: 1,
        sed: 1,
        sit: 1,
        tempor: 1,
      };

      expect(result).eql(expected);
    });
  });
});