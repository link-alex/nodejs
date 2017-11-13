import UserModel from './user';
import ProductModel from './product';

import Sequelize from 'sequelize';
import db from '../db';

const User = UserModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);

export { User, Product };
