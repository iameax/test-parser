import { unique } from '../utils';
import BaseParser from './base'

export const TYPE = 'TAGS';

export default class TagsParser extends BaseParser {
  constructor() {
    super(TYPE);
  }

  makeTags(text: string) {
    let tags = text.match(/(^|\B)#(?![\d_]+\b)([a-z\d_]{1,30})(\b|\r)/gi);

    if (!tags) {
      return [];
    }

    return unique(tags.map(tag => tag.substr(1)));
  };

  /**
   * Returns tags array.
   */
  async parseImpl(textContent) {
    return this.makeTags(textContent);
  }
}