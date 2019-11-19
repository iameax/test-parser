import { ParseOptions } from '../index';


export default abstract class BaseParser {
  type: string;

  protected constructor(type) {
    this.type = type;
  }
  
  async parse(textContent: string, options: ParseOptions = {}) {
    let result;

    if (options.maxTextLength) {
      textContent = textContent.substr(0, options.maxTextLength);
    }
    
    try {
      result = await this.parseImpl(textContent, options);
    } catch (e) {
      // log error
    }
    
    // metrics
    // log result
    
    return result;
  }
  
  async abstract parseImpl(textContent: string, options: ParseOptions);
  
  getType() {
    return this.type;
  }
}