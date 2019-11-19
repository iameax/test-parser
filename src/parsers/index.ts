import KeywordsParser, { TYPE as KEYWORDS } from './keywords';
import TagsParser, { TYPE as TAGS } from './tags';
import TokensParser, { TYPE as TOKENS } from './tokens';


export {
  KEYWORDS,
  TAGS,
  TOKENS,
};

export default [
  new KeywordsParser(),
  new TagsParser(),
  new TokensParser(),
];