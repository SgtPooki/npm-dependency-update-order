#!/usr/bin/env node
/* eslint-disable no-console */
import path from 'path'
import main from './lib.js'

const args = process.argv.slice(2)
const workingDirArg = args[0]
let workingDir = process.cwd()
if (workingDirArg != null) {
  workingDir = path.resolve(process.cwd(), workingDirArg)
}
main(workingDir)
  .catch(err => {
    console.error(err)
  })
