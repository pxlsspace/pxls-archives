import YAML from 'yaml';
import fs from 'fs';
import showdown from 'showdown';
import probe from 'probe-image-size';

const converter = new showdown.Converter();

export async function load() {
    const metaStr = fs.readFileSync('data/meta.yml', 'utf8');
    const meta = YAML.parse(metaStr);

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

    for (let i = 0; i < meta.canvases.length; i++) {
        const { code, description } = meta.canvases[i];
        if (description) {
            meta.canvases[i].description = converter.makeHtml(description);
        }
        const { width, height } = await probe(fs.createReadStream(`data/images/canvas-${code}-initial.png`));
        meta.canvases[i].width = width;
        meta.canvases[i].height = height;
        meta.canvases[i].timelapses = {
            normal: getFileInfo('videos', `c${code}_timelapse_normal.mp4`),
            activity: getFileInfo('videos', `c${code}_timelapse_activity.mp4`),
            virgin: getFileInfo('videos', `c${code}_timelapse_virgin.mp4`)
        };
        meta.canvases[i].hasTimelapses = Object.values(meta.canvases[i].timelapses).some(v => v != null);
        meta.canvases[i].graphs = {
            heat: getFileInfo('images', `c${code}_heat_0.png`),
            virgin: getFileInfo('images', `c${code}_virgin_0.png`),
            action: getFileInfo('images', `c${code}_action_0.png`),
            age: getFileInfo('images', `c${code}_age_0.png`),
            combined: getFileInfo('images', `c${code}_combined_0.png`),
            minutes: getFileInfo('images', `c${code}_minutes_0.png`),
            seconds: getFileInfo('images', `c${code}_seconds_0.png`),
            milliseconds: getFileInfo('images', `c${code}_milliseconds_0.png`)
        };
        meta.canvases[i].hasGraphs = Object.values(meta.canvases[i].graphs).some(v => v != null);
    }

    return {
        version: (await import('../../package')).version,
        ...meta
    };
}
