import { expect, assert } from 'chai';
import parse from '../../src';
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

      expect(result).not.contain.any.keys(['dolor', 'amet', 'lorem']);
    });

    it('maxTextLength: Should limit the text to options.maxTextLength characters', async () => {
      const result = await parser.parse(text, { maxTextLength: 60 });
      const expected = {
        lorem: 1,
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
        lorem: 1,
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

    it('Apostrophes', async () => {
      const text = `I don't wanna think 'bout it, 'cause ...`;
      const result = await parser.parse(text);

      return expect(result).eql({
        i: 1,
        '\'bout': 1,
        don: 1,
        '\'t': 1,
        wanna: 1,
        think: 1,
        it: 1,
        '\'cause': 1,
      });
    });

    it('Пример из тех задания', async () => {
      const text = `About John... If John goes home in monday at 10pm, I'll be happy!`;
      const result = await parser.parse(text, { ignoreWords: ['if', 'in', 'at', 'be', '\'ll'], minWordLength: 2 });

      return expect(result).eql({
        about: 1,
        john: 2,
        monday: 1,
        goes: 1,
        home: 1,
        '10pm': 1,
        happy: 1,
      });
    });
  });
});