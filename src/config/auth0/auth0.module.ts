import { Module } from '@nestjs/common';
import { Auth0ManagementService } from './auth0.management.service';
import { Auth0Service } from './auth0.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, HttpModule, UsersModule],
  providers: [Auth0ManagementService, Auth0Service],
  exports: [Auth0Service],
})
export class Auth0Module {}
