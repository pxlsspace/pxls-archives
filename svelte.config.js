import adapter from '@sveltejs/adapter-static';

import fs from 'fs';
import YAML from 'yaml';

const metaStr = fs.readFileSync('static/data/meta.yml', 'utf8');
const meta = YAML.parse(metaStr);

const canvasSlugs = meta.canvases.map(canvas => `/canvas-${canvas.code}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*', ...canvasSlugs],
			crawl: true
		}
	}
};

export default config;
