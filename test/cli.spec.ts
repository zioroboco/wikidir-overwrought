import { Cli } from "clipanion"
import { vol } from "memfs"

import { Context } from "../src/types"
import { HelloCommand } from "../src/commands/hello"

jest.mock("fs/promises", () => require("memfs").fs.promises)

it(`works`, async () => {
	vol.fromJSON(
		{
			"README.md": "# Hello world!",
		},
		process.cwd()
	)

	const context = {
		stdout: { write: jest.fn() },
		stderr: { write: jest.fn() },
	}

	const cli = new Cli<Context>({ binaryName: "test-cli" })
	cli.register(HelloCommand)

	// @ts-ignore
	await cli.run(["blep"], context as Context)

	expect(context.stdout.write).toHaveBeenCalledWith(
		expect.stringMatching("Hello blep from test-cli!")
	)

	expect(context.stdout.write).toHaveBeenCalledWith(
		expect.stringMatching("README.md")
	)

	expect(context.stdout.write).not.toHaveBeenCalledWith(
		expect.stringMatching("LICENSE")
	)
})
