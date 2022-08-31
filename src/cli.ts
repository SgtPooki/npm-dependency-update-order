import yargsParser from 'yargs-parser'

export default yargsParser(process.argv.slice(2), {
  boolean: ['write', 'nameOnly'],
  number: ['verbose'],
  array: ['targets'],
  alias: {
    write: ['w'],
    nameOnly: ['n'],
    verbose: ['v'],
    targets: ['t']
  },
  default: {
    w: false,
    nameOnly: true,
    verbose: 0,
    targets: []
  }
})
