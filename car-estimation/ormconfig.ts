import { DataSource } from 'typeorm';

const dbConfig = new DataSource({
  synchronize: false,
  migrations: ['migrations/*.ts'],
  type: 'sqlite',
  database: 'dbp.sqlite',
  entities: ['**/*.entity.ts'],
});

export default dbConfig;
