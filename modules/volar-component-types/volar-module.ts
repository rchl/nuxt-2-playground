import path from 'path';
import fs from 'fs';
import * as ts from 'typescript';
import * as volar from '@volar/language-core';
import { type RangeMapping } from './types';

const snapshotToMirrorMappings = new WeakMap();

function readComponentTypes(hostDirectory: string): { code: string; mappings: RangeMapping[] } {
    const componentDataFile = `${hostDirectory}/.nuxt/components/volar-component-data.json`;

    try {
        return JSON.parse(fs.readFileSync(componentDataFile, { encoding: 'utf-8' }));
    } catch (error) {
        console.error((error as Error).message);
        return { code: '', mappings: [] };
    }
}

const languageModule: volar.Language = {
    createVirtualFile(fileName, snapshot, _languageId) {
        if (fileName.endsWith('/generated-component-types.d.ts')) {
            return {
                fileName,
                snapshot,
                kind: volar.FileKind.TypeScriptHostFile,
                capabilities: {},
                embeddedFiles: [],
                mappings: [{
                    data: {},
                    sourceRange: [0, snapshot.getLength()],
                    generatedRange: [0, snapshot.getLength()],
                }],
                codegenStacks: [],
                mirrorBehaviorMappings: snapshotToMirrorMappings.get(snapshot),
            };
        }
    },
    updateVirtualFile(file, snapshot) {
        file.snapshot = snapshot;
        file.mappings = [{
            data: {},
            sourceRange: [0, snapshot.getLength()],
            generatedRange: [0, snapshot.getLength()],
        }];
        file.mirrorBehaviorMappings = snapshotToMirrorMappings.get(snapshot);
    },
    resolveHost(host) {
        const vueTypesScript = {
            projectVersion: '' as string | number,
            fileName: path.join(host.getCurrentDirectory(), 'generated-component-types.d.ts'),
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
                    this.projectVersion = host.getProjectVersion();
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
            ...host,
            getScriptFileNames() {
                return [
                    ...host.getScriptFileNames(),
                    vueTypesScript.fileName,
                ];
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

// Not a "export default" so that it compiles to "module.exports".
export = languageModule
