import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { User } from './entities/user'
import { UserAuthority } from './entities/user-authority'
import { CookiesModule } from './cookies/cookies.module'
import { ConfigModule } from '@nestjs/config'
import { pipe, flow } from 'fp-ts/function'
import { TasksModule } from './tasks/tasks.module'
import { TasksService } from './tasks/tasks.service'
import { Task } from './entities/task'
import { UserTask } from './entities/user_task'
import { UserTaskService } from './tasks/user-task.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.prod'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: pipe(process.env.DB_PORT, Number),
      username: pipe(process.env.DB_USER),
      password: pipe(process.env.DB_PASSWORD),
      database: pipe(process.env.DB_NAME),
      entities: [User, UserAuthority, Task, UserTask],
      synchronize: true,
    }),
    AuthModule,
    CookiesModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, UserTaskService],
})
export class AppModule {}
