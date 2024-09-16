import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qs from 'qs';

@Injectable({ scope: Scope.REQUEST })
export class Auth0ManagementService {
  private readonly audience: string;
  private readonly client_id: string;
  private readonly client_secret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.httpService.axiosRef.defaults.baseURL = `https://${this.configService.get('AUTH0_DOMAIN')}/`;
    this.audience = this.configService.get('AUTH0_MANAGEMENT_ADIENCE');
    this.client_id = this.configService.get('AUTH0_MANAGEMENT_CLIENT_ID');
    this.client_secret = this.configService.get(
      'AUTH0_MANAGEMENT_CLIENT_SECRET',
    );
  }

  async getAuth0ManagementAccessToken() {
    try {
      const a = await this.httpService.axiosRef.post(
        `oauth/token`,
        qs.stringify({
          grant_type: 'client_credentials',
          audience: this.audience,
          client_id: this.client_id,
          client_secret: this.client_secret,
        }),
      );

      return a.data.access_token;
    } catch (e) {
      console.log(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
