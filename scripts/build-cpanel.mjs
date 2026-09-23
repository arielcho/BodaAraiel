import { readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'vite';

const outDir = resolve('dist-cpanel');

await build({
  mode: 'cpanel',
  build: { outDir },
});

const unusedVideos = [
  '1 (1).mp4',
  '1 (2).mp4',
  '1-1-h264.mp4',
  '3.mp4',
  '4.mp4',
  'fondo.mp4',
  'intro.mp4',
  'vistaDron.mp4',
  'vistaDron-web-60.mp4',
];

await Promise.all(unusedVideos.map((name) => (
  rm(resolve(outDir, 'videos', name), { force: true })
)));

const imagesDir = resolve(outDir, 'images');
const imageNames = await readdir(imagesDir);
await Promise.all(imageNames
  .filter((name) => /^1 \(\d+\)\.jpg$/i.test(name))
  .map((name) => rm(resolve(imagesDir, name), { force: true })));

