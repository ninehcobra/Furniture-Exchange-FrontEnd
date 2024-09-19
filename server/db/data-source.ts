import { dataSourceOptions } from 'src/config/typeorm';
import { DataSource } from 'typeorm';

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
