const localeMappings = {
  'de': require('./de.json'),
  'en': require('./en.json')
}

export default {
  locales: Object.keys(localeMappings),
  localeMappings,
  defaultLocale: 'de'
}
