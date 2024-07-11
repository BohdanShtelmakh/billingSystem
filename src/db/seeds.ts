import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/role.entity';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

export async function run(dataSource: DataSource): Promise<void> {
    // await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');
    const roleRepository = dataSource.getRepository(Role);
    const userRepository = dataSource.getRepository(User);
    const adminRole = await roleRepository.save({ name: 'Admin' });
    const clientRole = await roleRepository.save({ name: 'Client' });
  
    const adminPassword = await bcrypt.hash('admin_password', 10);
    await userRepository.save({
      email: 'admin@example.com',
      password: adminPassword,
      role: adminRole,
    });
  
    console.log('Database seeded!');
  }
