import { DataSource } from 'typeorm';
import { dataSourceOptions } from 'src/modules/database/database.module';

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
