import yaml from "js-yaml"
import { DirectoryJSON, vol } from "memfs"
import { cli } from "../src"
import { readFileSync, readdirSync } from "fs"

jest.mock("fs/promises", () => require("memfs").fs.promises)

function fixturePath(name?: string) {
	return [__dirname, "fixtures", name].filter(Boolean).join("/")
}

const fixtures = readdirSync(fixturePath())
	.map(name => [name, readFileSync(fixturePath(name)).toString()])
	.map(([name, content]) => ({ [name]: yaml.load(content) as DirectoryJSON }))
	.reduce((acc, curr) => ({ ...acc, ...curr }), {})

it(`works`, async () => {
	vol.fromJSON(fixtures["hello.yaml"], process.cwd())

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

	expect(context.stdout.write).toHaveBeenCalledWith(
		expect.stringMatching(".gitignore")
	)

	expect(context.stdout.write).not.toHaveBeenCalledWith(
		expect.stringMatching("LICENSE")
	)
})
