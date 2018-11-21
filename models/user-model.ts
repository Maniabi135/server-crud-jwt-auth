/* jshint indent: 2 */
import { Table, Column, Model,  Unique } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  
    @Unique
    @Column
    username: string;
  
    @Unique
    @Column
    email: string;
  
    @Unique
    @Column
    password: string;
  
    @Column
    country: string;
    
}