import { expect } from 'chai';
import parse from '../src';


describe('Main module', () => {
  it('Should ignore XML tags', async () => {
    const textWithXMLTags = `Lorem ipsum dolor sit amet, <span>consectetur</span> adipiscing elit, <span id="id">sed do</span>.`;
    const result = await parse(textWithXMLTags);

    return expect(result).not.contain.keys(['span']);
  });

  it('Should ignore emojis', async () => {
    const textWithEmojis = `😀 ipsum 😁 ipsum 😂 ipsum 🤣 ipsum 😃 ipsum 😄ipsum 😅ipsum 😆.`;
    const result = await parse(textWithEmojis);

    return expect(result).eql({
      ipsum: 7
    });
  });

  it('Should return error in callback', (done) => {
    const text = `Text to parse.`;
    const callback = (err, result) => {
      expect(err).to.be.instanceOf(Error);

      done();
    };

    parse(text, { parsers: ['UNDEFINED_PARSER'] }, callback);
  });

  it('Multiple parsers result', async () => {
    const text = `Text with hashtags #tag1 #tag2 #Tag1 #tag2.`;
    const result = await parse(text, { parsers: ['KEYWORDS', 'TAGS']});

    return expect(result).eql({
      KEYWORDS: {
        text: 1,
        with: 1,
        hashtags: 1,
        tag1: 2,
        tag2: 2,
      },
      TAGS: ['tag1', 'tag2', 'Tag1']
    });
  });

  it('If callback was provided it should be called with result', (done) => {
    const text = `Text to parse.`;
    const callback = (err, result) => {
      expect(result).eql({
        text: 1,
        to: 1,
        parse: 1,
      });

      done();
    };

    parse(text, null, callback);
  });
});