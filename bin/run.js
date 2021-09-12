#!/usr/bin/env node
// @ts-check

const { cli } = require("..")

const [_node, _app, ...args] = process.argv

cli.runExit(args, {
	stdin: process.stdin,
	stdout: process.stdout,
	stderr: process.stderr,
})
