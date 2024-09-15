import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCredsI } from './auth0.types';
import { ConfigService } from '@nestjs/config';
import * as qs from 'qs';

@Injectable()
export class Auth0Service {
  private readonly audience: string;
  private readonly client_id: string;
  private readonly client_secret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.httpService.axiosRef.defaults.baseURL = `https://${this.configService.get('AUTH0_DOMAIN')}/`;
    this.audience = this.configService.get('AUTH0_ADIENCE');
    this.client_id = this.configService.get('AUTH0_CLIENT_ID');
    this.client_secret = this.configService.get('AUTH0_CLIENT_SECRET');
  }

  async getAccessToken(userCreds: UserCredsI) {
    try {
      const a = await this.httpService.axiosRef.post(
        `oauth/token`,
        qs.stringify({
          grant_type: 'password',
          ...userCreds,
          audience: this.audience,
          client_id: this.client_id,
          client_secret: this.client_secret,
          scope: 'read:sample',
        }),
      );

      return a.data;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
