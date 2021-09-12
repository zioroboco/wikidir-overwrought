import { InitialOptionsTsJest } from "ts-jest/dist/types"

const config: InitialOptionsTsJest = {
	preset: "ts-jest",
	roots: ["test"],
	testEnvironment: "node",
}

export default config
