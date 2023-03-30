/** @type {import('@volar/language-core').LanguageModule} */
module.exports = {
  createFile () {
    return undefined
  },
  updateFile () {},
  proxyLanguageServiceHost (host) {
    const ts = host.getTypeScriptModule()
    const vueTypesScript = {
      projectVersion: '',
      fileName: `${host.getCurrentDirectory()}/generated-component-types.d.ts`,
      _version: 0,
      _snapshot: ts?.ScriptSnapshot.fromString(''),
      get version () {
        this.update()
        return this._version
      },
      get snapshot () {
        this.update()
        return this._snapshot
      },
      update () {
        if (!this._snapshot) {
          return
        }
        if (!host.getProjectVersion || host.getProjectVersion() !== this.projectVersion) {
          this.projectVersion = host.getProjectVersion?.() ?? ''
          const newText = this.generateText()
          if (newText !== this._snapshot.getText(0, this._snapshot.getLength())) {
            this._version++
            this._snapshot = ts?.ScriptSnapshot.fromString(newText)
          }
        }
      },
      generateText () {
        const projectFileNames = host.getScriptFileNames().map(fileName => fileName.replace(`${host.getCurrentDirectory()}/`, ''))
        const vueFiles = projectFileNames.filter(fileName => (fileName.startsWith('pages/') || fileName.startsWith('components/')) && fileName.endsWith('.vue'))
        const components = vueFiles
          .map((path) => {
            const filename = path.split('/').pop()
            if (!filename) {
              return ''
            }
            const [basename, _] = filename.split('.')
            return {
              name: basename,
              path
            }
          })
          .filter(Boolean)
        return `
declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        ${components.map(component => `${component.name}: typeof import('${component.path}').default`).join(('\n'))}
        ${components.map(component => `Lazy${component.name}: typeof import('${component.path}').default`).join(('\n'))}
    }
}
`
      }
    }

    return {
      getScriptFileNames () {
        return [
          ...host.getScriptFileNames(),
          vueTypesScript.fileName
        ]
      },
      getScriptVersion (fileName) {
        if (fileName === vueTypesScript.fileName) {
          return String(vueTypesScript.version)
        }
        return host.getScriptVersion(fileName)
      },
      getScriptSnapshot (fileName) {
        if (fileName === vueTypesScript.fileName) {
          return vueTypesScript.snapshot
        }
        return host.getScriptSnapshot(fileName)
      }
    }
  }
}
