const Promise = require('bluebird')
let rules

const loadRules = () => {
  if (!rules) rules = require('../rules')
}

const array = {
  default: context => {
    // Ensure array
    if (!Array.isArray(context.value)) {
      return context.fail('Value must be an array')
    }
    // If empty (and empty allowed), move forward
    if (context.def.empty && context.value.length === 0) {
      return context.value
    }
    // If empty (and not empty allowed), fail
    if (!context.def.empty && context.value.length === 0) {
      return context.fail('Value must not be empty array')
    }
    // Specific array sub-validation
    if (!context.def.values) return context.value

    loadRules()
    const promises = context.value.map((elem, idx) => {
      return rules.validate(context.def.values, elem, context.def.opts, `${context.key}[${idx}]`, context.errors, false, context.initData)
    })
    return Promise.all(promises)
  }
}

module.exports = array
