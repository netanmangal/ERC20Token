const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractFile = "";

const contractPath = path.resolve(__dirname, "contracts", contractFile);
const source = fs.readFileSync(contractPath, "utf-8");

const input = {
    language: "Solidity",
    sources: {
        [contractFile]: {
            content: source
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);
for (var contractName in output.contracts[contractFile]) {
    fs.outputJSONSync(
        path.resolve(buildPath, contractName + ".json"),
        output.contracts[contractFile][contractName]
    );
}