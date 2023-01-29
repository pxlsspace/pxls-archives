import { error } from '@sveltejs/kit';

import YAML from 'yaml';
import fs from 'fs';
import showdown from 'showdown';
import probe from 'probe-image-size';

const converter = new showdown.Converter();

export async function load({ params }) {
    const exec = /canvas-(\w+)/.exec(params.slug);

    if (!exec) {
        throw error(404, 'Not found');
    }

    const reqCanvasCode = exec[1];

    const metaStr = fs.readFileSync('data/meta.yml', 'utf8');
    const meta = YAML.parse(metaStr);

    const canvas = meta.canvases.find(canvas => canvas.code === reqCanvasCode);

    if (!canvas) {
        throw error(404, 'Canvas not found');
    }

    const imageFiles = fs.readdirSync('data/images');
    const videoFiles = fs.readdirSync('data/videos');

    const getFileInfo = (type, name) => {
        let files;
        if (type === 'videos') {
            files = videoFiles;
        } else if (type === 'images') {
            files = imageFiles;
        }

        const fileName = files.find(fileName => fileName === name);
        if (!fileName) return null;
        const stats = fs.statSync(`data/${type}/${fileName}`);
        return {
            fileName,
            // In megabytes
            fileSize: (stats.size / (1024 * 1024)).toFixed(1) + ' MB'
        }
    };

    const { code, description } = canvas;
    if (description) {
        canvas.description = converter.makeHtml(description);
    }
    const { width, height } = await probe(fs.createReadStream(`data/images/canvas-${code}-initial.png`));
    canvas.width = width;
    canvas.height = height;
    canvas.timelapses = {
        normal: getFileInfo('videos', `c${code}_timelapse_normal.mp4`),
        activity: getFileInfo('videos', `c${code}_timelapse_activity.mp4`),
        virgin: getFileInfo('videos', `c${code}_timelapse_virgin.mp4`)
    };
    canvas.hasTimelapses = Object.values(canvas.timelapses).some(v => v != null);
    canvas.graphs = {
        heat: getFileInfo('images', `c${code}_heat_0.png`),
        virgin: getFileInfo('images', `c${code}_virgin_0.png`),
        action: getFileInfo('images', `c${code}_action_0.png`),
        age: getFileInfo('images', `c${code}_age_0.png`),
        combined: getFileInfo('images', `c${code}_combined_0.png`),
        minutes: getFileInfo('images', `c${code}_minutes_0.png`),
        seconds: getFileInfo('images', `c${code}_seconds_0.png`),
        milliseconds: getFileInfo('images', `c${code}_milliseconds_0.png`)
    };
    canvas.hasGraphs = Object.values(canvas.graphs).some(v => v != null);

    return { canvas };
}
