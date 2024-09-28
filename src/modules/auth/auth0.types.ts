export interface UserCredsI {
  readonly studentId: string;
  readonly password: string;
}

export interface LoginVerifyI {
  readonly user: UserCredsI;
  readonly otp: string;
}
