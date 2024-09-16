import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Auth0ManagementService } from '../auth0.management.service';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  private token: string;
  private connectionId: string;

  constructor(
    private readonly auth0Service: Auth0ManagementService,
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.httpService.axiosRef.defaults.baseURL = `https://${this.configService.get('AUTH0_DOMAIN')}/`;
    this.connectionId = this.configService.get('AUTH0_CONNECTION_ID');
  }

  async createUser(user: any) {
    this.token = await this.auth0Service.getAuth0ManagementAccessToken();

    try {
      const a = await this.httpService.axiosRef.post(
        `api/v2/users`,
        { ...user, connection: 'Username-Password-Authentication' },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        },
      );

      return a.data;
    } catch (e) {
      console.log(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async passworkChangeTicket(email: string) {
    this.token = await this.auth0Service.getAuth0ManagementAccessToken();

    try {
      const a = await this.httpService.axiosRef.post(
        `api/v2/tickets/password-change`,
        { email, connection_id: this.connectionId },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        },
      );

      return a.data;
    } catch (e) {
      console.log(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
