const fs = require('fs');
const ts = require('typescript');
const volar = require('@volar/language-core');
const snapshotToMirrorMappings = new WeakMap();

function readComponentTypes(hostDirectory) {
    const componentDataFile = `${hostDirectory}/.nuxt/components/volar-component-data.json`;
    try {
        return JSON.parse(fs.readFileSync(componentDataFile, { encoding: 'utf-8' }));
    } catch (error) {
        console.error(error.message);
        return { code: '', mappings: [] };
    }
}

/** @type {import('@volar/language-core').LanguageModule} */
module.exports = {
    createFile(fileName, snapshot) {
        if (fileName.endsWith('/generated-component-types.d.ts')) {
            return {
                fileName,
                snapshot,
                capabilities: {},
                embeddedFiles: [],
                kind: volar.FileKind.TypeScriptHostFile,
                mappings: [{
                    data: {},
                    sourceRange: [0, snapshot.getLength()],
                    generatedRange: [0, snapshot.getLength()],
                }],
                mirrorBehaviorMappings: snapshotToMirrorMappings.get(snapshot),
            };
        }
    },
    updateFile(file, newSnapshot) {
        file.snapshot = newSnapshot;
        file.mappings = [{
            data: {},
            sourceRange: [0, newSnapshot.getLength()],
            generatedRange: [0, newSnapshot.getLength()],
        }];
        file.mirrorBehaviorMappings = snapshotToMirrorMappings.get(newSnapshot);
    },
    proxyLanguageServiceHost(host) {
        const vueTypesScript = {
            projectVersion: '',
            fileName: host.getCurrentDirectory() + '/generated-component-types.d.ts',
            _version: 0,
            _snapshot: ts.ScriptSnapshot.fromString(''),
            get version() {
                this.update();
                return this._version;
            },
            get snapshot() {
                this.update();
                return this._snapshot;
            },
            update() {
                if (!this._snapshot) {
                    return;
                }
                if (!host.getProjectVersion || host.getProjectVersion() !== this.projectVersion) {
                    this.projectVersion = host.getProjectVersion?.() ?? '';
                    const { code, mirrorMappings } = this.generateCodeAndMappings();
                    if (code !== this._snapshot.getText(0, this._snapshot.getLength())) {
                        // console.error(code);
                        // console.error(mirrorMappings);
                        this._version++;
                        this._snapshot = ts.ScriptSnapshot.fromString(code);
                        snapshotToMirrorMappings.set(this._snapshot, mirrorMappings);
                    }
                }
            },
            generateCodeAndMappings() {
                const hostDirectory = host.getCurrentDirectory();
                const { code, mappings } = readComponentTypes(hostDirectory);
                const mirrorMappings = mappings.map(mapping => ({
                    data: [volar.MirrorBehaviorCapabilities.full, volar.MirrorBehaviorCapabilities.full],
                    sourceRange: mapping[0],
                    generatedRange: mapping[1],
                }));
                return { code, mirrorMappings };
            },
        };

        return {
            getScriptFileNames() {
                return [
                    ...host.getScriptFileNames(),
                    vueTypesScript.fileName,
                ];
            },
            getScriptVersion(fileName) {
                if (fileName === vueTypesScript.fileName) {
                    return String(vueTypesScript.version);
                }
                return host.getScriptVersion(fileName);
            },
            getScriptSnapshot(fileName) {
                if (fileName === vueTypesScript.fileName) {
                    return vueTypesScript.snapshot;
                }
                return host.getScriptSnapshot(fileName);
            },
        };
    },
};
