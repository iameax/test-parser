import parsers from './parsers';


class ParsersRegistry {
  _registry = new Map();
  
  get(type) {
    if (!this._registry.has(type)) {
      throw new Error(`Undefined parser type ${type}`);
    }
    
    return this._registry.get(type);
  }
  
  set(type, parser) {
    if (this._registry.has(type)) {
      throw new Error(`Parser with type ${type} is already exists`);
    }

    this._registry.set(type, parser);
  }
}

const registry = new ParsersRegistry();

parsers.forEach(parser => {
  registry.set(parser.getType(), parser);
});

export default registry;