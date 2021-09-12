import { Command, Option } from "clipanion"
import { Context } from "../types"
import { readdir } from "fs/promises"

export class HelloCommand extends Command<Context> {
	name = Option.String()

	async execute() {
		this.context.stdout.write(
			[
				`Hello ${this.name} from ${this.cli.binaryName}!`,
				`I found some files:\n`,
			].join("\n")
		)

		const files = await readdir(process.cwd())
		this.context.stdout.write(files.join("\n"))
	}
}
