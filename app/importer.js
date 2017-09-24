import fs from 'fs';
import EventEmitter from 'events';
import path from 'path';

import emitter from './emitter';
import { events } from '../constants';
import { convertCSVToJSON } from '../helpers';

const encoding = 'utf8';

function logContent(content, filePath) {
    console.log(`========== START of ${filePath}`);
    console.log(content);
    console.log(`========== END of ${filePath}`);
}

export default class Importer {
    constructor() {
        emitter.on(events.DIR_WATCHER_CHANGED, (filePath) => {
            this.import(filePath);
        })
    }

    import(filePath) {
        return new Promise((resolve) => {
            fs.readFile(filePath, encoding, (err, data) => {
                if (err) {
                    reject(err);
                };

                const json = convertCSVToJSON(data);

                logContent(json, filePath);

                resolve(json);
            });
        });
    }

    importSync(folderPath) {
        const result = [];
        const fileNames = fs.readdirSync(folderPath);

        fileNames.forEach((fileName) => {
            const filePath = path.join(folderPath, fileName);
            const data = fs.readFileSync(filePath, encoding);
            const json = convertCSVToJSON(data);

            logContent(json, filePath);

            result.push(json);
        });

        return result;
    }
}
