import YAML from 'yaml';
import fs from 'fs';
import showdown from 'showdown';

const converter = new showdown.Converter();

export async function load() {
    const metaStr = fs.readFileSync('static/data/meta.yml', 'utf8');
    const meta = YAML.parse(metaStr);

    for (const canvasCode in meta.canvases) {
        const canvas = meta.canvases[canvasCode];
        const { description } = canvas;
        if (!description) continue;
        meta.canvases[canvasCode].description = converter.makeHtml(description);
    }

    return {
        version: process.env.npm_package_version,
        ...meta
    };
}

export const prerender = true;
