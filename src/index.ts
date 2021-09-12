import type { Context } from "./types"
import { Cli } from "clipanion"
import { HelloCommand } from "./commands/hello"

const meta = require("../package.json")

const cli = new Cli<Context>({
	binaryName: meta.name,
	binaryVersion: meta.version,
})

cli.register(HelloCommand)

export { cli }
