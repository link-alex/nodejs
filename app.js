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
