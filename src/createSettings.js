export function createSettings(defaults, overrides) {
  const _settings = _updateSettingsFromDefinitions(defaults, overrides)
  return new Proxy(_settings, {
    get(target, name) {
      const value = target[name]
      if (value === undefined) {
        throw new Error(`Unknown setting: ${name}`)
      }
      return value
    }
  })
}

function _updateSettingsFromDefinitions(defaults = {}, overrides = {}) {
  const settings = {}
  Object.keys(defaults).forEach(key => {
    _setIfDefined(settings, key, defaults)
    _setIfDefined(settings, key, overrides)
    if (settings[key] !== undefined) {
      console.debug(`Setting defined: ${key}=${settings[key]}`)
    }
  })
  return settings
}

function _setIfDefined(target, key, source) {
  const override = source[key]
  if (override !== undefined) {
    target[key] = override
  }
}

// const settings = createSettings()
// globalThis.settings = settings

// export default settings
