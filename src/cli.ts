import yargsParser from 'yargs-parser'

export default yargsParser(process.argv.slice(2), {
  boolean: ['write', 'nameOnly', 'displayInstallCommands'],
  number: ['verbose'],
  array: ['targets'],
  alias: {
    write: ['w'],
    nameOnly: ['n'],
    verbose: ['v'],
    targets: ['t'],
    displayInstallCommands: ['i']
  },
  default: {
    /**
     * Do not write files by default
     */
    write: false,
    /**
     * Use the package name only by default
     * Setting this to false will set the package identifier to `${name}@${version}`
     */
    nameOnly: true,
    /**
     * Set verbosity to 0 by default. Increase value to get more output
     */
    verbose: 0,
    /**
     * Set the target dependencies you're interested in to get more details about
     * what is required to update them.
     */
    targets: [],
    /**
     * Do not output `npm install` commands by default
     */
    displayInstallCommands: false
  }
})
