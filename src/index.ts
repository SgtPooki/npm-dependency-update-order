#!/usr/bin/env node
/* eslint-disable no-console */
import main from './lib.js'

main()
  .catch(err => {
    console.error(err)
  })
