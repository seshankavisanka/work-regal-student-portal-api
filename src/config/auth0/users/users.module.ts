import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Auth0ManagementService } from '../auth0.management.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [UsersService, Auth0ManagementService],
  exports: [UsersService],
})
export class UsersModule {}
