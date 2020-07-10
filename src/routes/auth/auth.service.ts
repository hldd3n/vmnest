import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from '../../models/user-login.dto';

@Injectable()
export class AuthService {
    private OAuthUrl
    private clientId;
    private clientSecret;
    private callbackUrl;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {
        this.OAuthUrl = this.configService.githubOAuthUrl;
        this.clientId = this.configService.githubClientId;
        this.clientSecret = this.configService.githubClientSecret;
        this.callbackUrl = this.configService.githubCallbackUrl;
    }

    public async signUser(user: UserLoginDTO) {
        return this.jwtService.sign({ username: user.username })
    }

    public async getAccessToken(code: string) {
        const requestUrl = `${this.OAuthUrl}/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}`
        const authResponse = await this.httpService.post(requestUrl).toPromise()
        const accessToken = authResponse.data.split(/[=, &]/)[1];
        return accessToken;
    }

    public getRedirectUrl(username) {
        const redirect_url = `${this.OAuthUrl}/authorize?client_id=${this.clientId}&redirect_url=${this.callbackUrl}?username=${username}`
        console.log('redirect', redirect_url);
        return redirect_url
    }
}
