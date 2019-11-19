import { KEYWORDS } from './parsers'
import parserRegistry from './registry';
import { getTextContent } from './utils';


const defaultOptions = {
  parsers: [KEYWORDS],
  minWordLength: 0,
  maxTextLength: 0,
  ignoreWords: [],
};

export interface ParseOptions {
  // parser types to use. Available parsers: KEYWORDS, TAGS
  parsers?: Array<string>;
  minWordLength?: number;
  maxTextLength?: number;
  // word exclusions
  ignoreWords?: Array<string>;
}

export type ParseResult = any | {
  [key: string]: any;
}

const getParsedResult = async (textContent, options) => {
  if (!options.parsers || options.parsers.length === 1) {
    const parser = parserRegistry.get(options.parsers[0]);
    return parser.parse(textContent, options);
  }

  const result = {};
  const promises = options.parsers.map(async type => {
    const parser = parserRegistry.get(type);
    result[type] = await parser.parse(textContent, options);
  });

  await Promise.all(promises);

  return result;
};

const parse = async function (htmlString: string, options?: ParseOptions, callback?: (err: Error, result: ParseResult) => void): Promise<ParseResult> {
  if (typeof htmlString !== 'string') {
    throw new Error('Invalid html string parameter');
  }

  options = options ? { ...defaultOptions, ...options } : defaultOptions;
  let result;

  try {
    const textContent = getTextContent(htmlString);
    result = await getParsedResult(textContent, options);

    if (callback) {
      callback(null, result);
    }
  } catch (e) {
    if (callback) {
      callback(e, result);
    } else {
      throw e;
    }
  }

  return result;
};

export default parse;