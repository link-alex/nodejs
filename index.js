import { app } from './config';
import { Product, User } from './models';

console.log(app.name);

const user = new User();
const product = new Product();
