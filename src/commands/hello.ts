import { Command, Option } from "clipanion"
import { Context } from "../types"

export class HelloCommand extends Command<Context> {
	name = Option.String()

	async execute() {
		this.context.stdout.write(`Hello ${this.name} from ${this.cli.binaryName}!`)
	}
}
