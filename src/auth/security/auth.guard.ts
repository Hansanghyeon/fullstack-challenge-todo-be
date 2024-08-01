import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard as NestAuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(private configService: ConfigService) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const masterToken = this.configService.get<string>('MASTER_TOKEN')

    if (request.headers.authorization === `Bearer ${masterToken}`) {
      return true
    }
    return super.canActivate(context)
  }
}
