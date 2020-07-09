import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class AuthService {
    private OAuthUrl
    private clientId;
    private clientSecret;
    private callbackUrl;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.OAuthUrl = this.configService.githubOAuthUrl;
        this.clientId = this.configService.githubClientId;
        this.clientSecret = this.configService.githubClientSecret;
        this.callbackUrl = this.configService.githubCallbackUrl;
    }

    public async getCookieWithAccessToken(code: string) {
        const requestUrl = `${this.OAuthUrl}/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}`
        const authResponse = await this.httpService.post(requestUrl).toPromise()
        const accessToken = authResponse.data.split(/[=, &]/)[1];
        return `Authentication=${accessToken}; HttpOnly; Path=/`;
    }

    public getRedirectUrl() {
        const redirect_url = `${this.OAuthUrl}/authorize?client_id=${this.clientId}&redirect_url=${this.callbackUrl}`
        return redirect_url
    }
}
