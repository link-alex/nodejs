import { app } from './config';
import { Product, User } from './models';

import Dirwatcher from './app/dirwatcher';
import Importer from './app/importer';
import { dirWatcher } from './constants';

import { utilProgram } from './utils/streams';

console.log(app.name);

const user = new User();
const product = new Product();

const importer = new Importer();
const currentDataContent = importer.importSync(dirWatcher.DATA_PATH);
const count = currentDataContent.length;

console.log(`There are currently ${count} file(s) in data folder.`);

const watcher = new Dirwatcher();
watcher.watch(dirWatcher.DATA_PATH, dirWatcher.DELAY);

utilProgram();
