import { cli } from "../src"
import { vol } from "memfs"

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

	// @ts-ignore
	await cli.run(["blep"], context)

	expect(context.stdout.write).toHaveBeenCalledWith(
		expect.stringMatching("Hello blep from wikidir!")
	)

	expect(context.stdout.write).toHaveBeenCalledWith(
		expect.stringMatching("README.md")
	)

	expect(context.stdout.write).not.toHaveBeenCalledWith(
		expect.stringMatching("LICENSE")
	)
})
