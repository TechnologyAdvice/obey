const string = {
  _regex: {
    alphanumeric: /^[a-zA-Z0-9]*$/
  },
  default: context => {
    if (typeof context.value !== 'string' || context.value.length === 0) {
      context.fail('Value must be a string')
    }
  },
  alphanumeric: context => {
    if (context.value == null || !context.value.length || !context.value.toString().match(string._regex.alphanumeric)) {
      context.fail('Value must contain only letters and/or numbers')
    }
  }
}

module.exports = string
