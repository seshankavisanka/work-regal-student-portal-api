import { Module } from '@nestjs/common';
import { AuthorizationModule } from './config/authorization/authorization.module';
import { Auth0Module } from './config/auth0/auth0.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthorizationModule,
    Auth0Module,
  ],
})
export class AppModule {}
