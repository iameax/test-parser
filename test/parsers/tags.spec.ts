import { expect, assert } from 'chai';
import TagsParser from '../../src/parsers/tags';
import 'mocha';


const parser = new TagsParser();

describe('Tags Parser', () => {
  describe('Implementation', () => {
    it('Should ignore invalid tags (#a#a, #a-b #a.a #a/)', async () => {
      const text = '#a#a, #a-b #a.a #a/ #a';
      const result = await parser.parse(text, { parsers: ['TAGS'] });
      expect(result).contain('a')
        .and.not.contain('a#a')
        .and.not.contain('a-b')
        .and.not.contain('a.a')
        .and.not.contain('a/')
      ;
    });

    it('Should be case insensetive', async () => {
      const text = '#Tag_Name';
      const result = await parser.parse(text, { parsers: ['TAGS'] });
      expect(result).eql(['Tag_Name']);
    });
  });
});