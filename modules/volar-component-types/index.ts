import path from 'upath';
import { Module } from '@nuxt/types';
import { parseLocationMappings } from './parse';
import type { ComponentDefinition, RangeMapping } from './types';

export default <Module> function VolarComponentTypesModule() {
    const { nuxt } = this;

    nuxt.hook('components:extend', (components: ComponentDefinition[]) => {
        const data: ComponentDefinition[] = components.map(component => ({ filePath: component.filePath, pascalName: component.pascalName }));
        data.push({
            filePath: path.resolve(this.options.buildDir, 'components', 'nuxt-link.client.js'),
            pascalName: 'NuxtLink',
            wrapComponent: true,
        });

        const [code, mappings] = generateComponentTypes(data, this.options.rootDir);

        if (this.options.debug) {
            this.addTemplate({
                src: path.resolve(__dirname, 'templates', 'component-types.d.ts'),
                fileName: './components/volar-component-types.d.ts',
                options: { code },
            });
        }

        this.addTemplate({
            src: path.resolve(__dirname, 'templates', 'component-data.ejs'),
            fileName: './components/volar-component-data.json',
            options: { code, mappings },
        });
    });
};

const TEMPLATE = `import 'vue';

declare module 'vue' {
    export interface GlobalComponents {
/*IMPORTS*/
    }
}
`;

function indent(level: number, code: string): string {
    return code
        .split('\n')
        .map(line => ''.padStart(level) + line)
        .join('\n');
}

function generateComponentTypes(components: ComponentDefinition[], rootDir: string): [string, RangeMapping[]] {
    const definitions = components
        .map(component => `${component.pascalName}: typeof import('./${path.relative(rootDir, component.filePath)}').default;`)
        .join('\n');

    const code = TEMPLATE.replace('/*IMPORTS*/', indent(8, definitions));
    const mappings = parseLocationMappings(code);

    return [code, mappings];
}
