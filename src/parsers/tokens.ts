import BaseParser from './base'

export const TYPE = 'TOKENS';

export default class TokensParser extends BaseParser {
  constructor() {
    super(TYPE);
  }
  
  async parseImpl(textContent) {
    // todo implement
    return false;
  }
}