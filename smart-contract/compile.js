const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

const basePath = path.resolve(__dirname, "contracts");

// interfaces folder
const IAccessControlSourceCode = fs.readFileSync(path.join(basePath, "interfaces", "IAccessControl.sol"), "utf-8");
const IERC165SourceCode = fs.readFileSync(path.join(basePath, "interfaces", "IERC165.sol"), "utf-8");
const IERC20MetadataSourceCode = fs.readFileSync(path.join(basePath, "interfaces", "IERC20Metadata.sol"), "utf-8");
const IERC20SourceCode = fs.readFileSync(path.join(basePath, "interfaces", "IERC20.sol"), "utf-8");

// libraries folder
const AccessControlSourceCode = fs.readFileSync(path.join(basePath, "libraries", "AccessControl.sol"), "utf-8");
const ContextSourceCode = fs.readFileSync(path.join(basePath, "libraries", "Context.sol"), "utf-8");
const ERC165SourceCode = fs.readFileSync(path.join(basePath, "libraries", "ERC165.sol"), "utf-8");
const ERC20SourceCode = fs.readFileSync(path.join(basePath, "libraries", "ERC20.sol"), "utf-8");
const StringsSourceCode = fs.readFileSync(path.join(basePath, "libraries", "Strings.sol"), "utf-8");

// core folder
const ERC20Key = fs.readFileSync(path.join(basePath, "ERC20Key.sol"), "utf-8");


const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

function fileImport (path) {
    if (path === "interfaces/IAccessControl.sol") return {contents: `${IAccessControlSourceCode}`};
    if (path === "interfaces/IERC165.sol") return {contents: `${IERC165SourceCode}`};
    if (path === "interfaces/IERC20Metadata.sol") return {contents: `${IERC20MetadataSourceCode}`};
    if (path === "interfaces/IERC20.sol") return {contents: `${IERC20SourceCode}`};

    if (path === "libraries/AccessControl.sol") return {contents: `${AccessControlSourceCode}`};
    if (path === "libraries/Context.sol") return {contents: `${ContextSourceCode}`};
    if (path === "libraries/ERC165.sol") return {contents: `${ERC165SourceCode}`};
    if (path === "libraries/ERC20.sol") return {contents: `${ERC20SourceCode}`};
    if (path === "libraries/Strings.sol") return {contents: `${StringsSourceCode}`};

    if (path === "ERC20Key.sol") return {contents: `${ERC165SourceCode}`};

    return {error: `Error: - ${path} - File not found`};
}

function compileContract (Contract) {
    const contractPath = path.resolve(__dirname, ...Contract);
    const contractSourceCode = fs.readFileSync(contractPath, "utf-8");
    fs.ensureDirSync(buildPath);

    const input = {
        language: "Solidity",
        sources: {
            Contract: {
                content: contractSourceCode
            }
        },
        settings: {
            optimizer: {
                enabled: true
            },
            outputSelection: {
                "*": {
                    "*": ["*"]
                }
            }
        }
    };

    let output = JSON.parse(solc.compile(JSON.stringify(input), {import: fileImport}));
    
    for (let contractName in output.contracts.Contract) {
        fs.outputJSONSync(
            path.resolve(buildPath, contractName + ".json"),
            output.contracts.Contract[contractName]
        );
    }
}

compileContract(["./", "contracts", "ERC20Key.sol"]);