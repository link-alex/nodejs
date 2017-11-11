/**
 * It still needed? Should it be separate app?
 * We are building one app using all hometasks, aren't we?
 */
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
// watcher.watch(dirWatcher.DATA_PATH, dirWatcher.DELAY);

// utilProgram();

import express from 'express';
import bodyParser from 'body-parser';

// routes
import productsRouter from './routes/productsRouter';
import usersRouter from './routes/usersRouter';

import authRouter from './routes/authRouter';

import passportLocalRouter from './routes/passport/localRouter';
import passportFacebookRouter from './routes/passport/facebookRouter';
import passportTwitterRouter from './routes/passport/twitterRouter';
import passportGoogleRouter from './routes/passport/googleRouter';

// middlewares
import cookieMiddleware from './middlewares/cookieMiddleware';
import queryMiddleware from './middlewares/queryMiddleware';

const expressApp = express();

expressApp.use(bodyParser.json());

expressApp.use(cookieMiddleware);
expressApp.use(queryMiddleware);

expressApp.use('/passport', passportLocalRouter);
expressApp.use('/passport', passportFacebookRouter);
expressApp.use('/passport', passportTwitterRouter);
expressApp.use('/passport', passportGoogleRouter);

expressApp.use('/auth', authRouter);
expressApp.use('/api', productsRouter);
expressApp.use('/api', usersRouter);

module.exports = expressApp;
