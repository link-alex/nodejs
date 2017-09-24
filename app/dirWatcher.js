import fs from 'fs';
import { join } from 'path';

import { events } from '../constants';
import emitter from './emitter';

export default class Dirwatcher {
    watch(path, delay) {
        setTimeout(() => {
            fs.watch(path, (eventType, filename) => {
                if (filename) {
                    const filePath = join(path, filename);

                    // checking that file exists
                    fs.access(filePath, fs.constants.F_OK, (err) => {
                        if (err) {
                            console.log(`Seems that ${filename} was deleted / renamed. How should we handle this case?`);
                        } else {
                            console.log(`${filename} was added / updated:`);
                            emitter.emit(events.DIR_WATCHER_CHANGED, filePath);
                        }
                    });
                }
            });
        }, delay);
    }
}
