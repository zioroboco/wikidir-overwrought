import { BaseContext, Cli } from "clipanion"

import { Context } from "../src/types"
import { HelloCommand } from "../src/commands/hello"

it(`works`, async () => {
	const context = {
		stdout: { write: jest.fn() },
		stderr: { write: jest.fn() },
	}

	const cli = new Cli<Context>({ binaryName: "test-cli" })
	cli.register(HelloCommand)

	// @ts-ignore
	await cli.run(["blep"], context as BaseContext)

	expect(context.stdout.write).toHaveBeenCalledWith(
		expect.stringMatching("Hello blep from test-cli!")
	)
})
