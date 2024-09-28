import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { UserDTO } from './dto/user.dto'
import { AuthGuard } from './security/auth.guard'
import { RolesGuard } from './role.guard'
import { RoleType } from './role-type'
import { Roles } from './repository/role.decorator'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  //
  @Post('/sign-up')
  async signUp(@Req() req: Request, @Body() userDTO: UserDTO) {
    return await this.authService.registerUser(userDTO)
  }

  @ApiOperation({
    summary: '로그인',
    description: '로그인 성공시 토큰을 반환합니다.',
  })
  //
  @Post('/sign-in')
  async signin(@Body() userDTO: UserDTO, @Res() res: Response) {
    const jwt = await this.authService.validateUser(userDTO)
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken)
    return res.json(jwt)
  }

  @ApiOperation({ summary: '관리자 역활확인' })
  //
  @Get('/admin-role')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  adminRoleCheck(@Req() req: Request): any {
    const user: any = req.user
    return user
  }

  @ApiOperation({ summary: '토큰 유효확인' })
  // 가드(AuthGuard) 추가해주기
  @Get('/authenticate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: Request) {
    const user = req.user
    return user
  }
}
