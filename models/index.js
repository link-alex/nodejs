import UserModel from './user';
import ProductModel from './product';
import CityModel from './city';

import { mongoose, autoIncrement } from '../db';

const Users = UserModel(mongoose, autoIncrement);
const Products = ProductModel(mongoose, autoIncrement);
const Cities = CityModel(mongoose, autoIncrement);

export { Users, Products, Cities };
