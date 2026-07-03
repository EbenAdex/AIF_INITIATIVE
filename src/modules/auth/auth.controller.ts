// import {
//   Body,
//   Controller,
//   Post,
//   UseGuards,
//   Request,
// } from '@nestjs/common';

// import { AuthService } from './auth.service';
// import { Public } from 'src/common/decorators/public.decorator';
// import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private auth: AuthService) {}

//   @Public()
//   @Post('register')
//   register(@Body() dto: any) {
//     return this.auth.register(dto);
//   }

//   @Public()
//   @Post('login')
//   login(@Body() dto: any) {
//     return this.auth.login(dto);
//   }

//   @Public()
//   @Post('verify-email')
//   verify(@Body('token') token: string) {
//     return this.auth.verifyEmail(token);
//   }

//   @Public()
//   @Post('forgot-password')
//   forgot(@Body('email') email: string) {
//     return this.auth.forgotPassword(email);
//   }

//   @Public()
//   @Post('reset-password')
//   reset(@Body() dto: any) {
//     return this.auth.resetPassword(dto.token, dto.password);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post('logout')
//   logout(@Request() req: any) {
//     return this.auth.logout(req.user.sub);
//   }
// }

import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

// DTOs
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { RefreshTokenDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  // -------------------
  // REGISTER
  // -------------------
  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  // -------------------
  // LOGIN
  // -------------------
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  // -------------------
  // VERIFY EMAIL
  // -------------------
  @Public()
  @Post('verify-email')
  verify(@Body() dto: VerifyEmailDto) {
    return this.auth.verifyEmail(dto.token);
  }

  // -------------------
  // FORGOT PASSWORD
  // -------------------
  @Public()
  @Post('forgot-password')
  forgot(@Body() dto: ForgotPasswordDto) {
    return this.auth.forgotPassword(dto.email);
  }

  // -------------------
  // RESET PASSWORD
  // -------------------
  @Public()
  @Post('reset-password')
  reset(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto.token, dto.password);
  }

    // -------------------
  // REFRESH TOKEN
  // -------------------

  @Public()
@Post('refresh')
refreshToken(@Body() dto: RefreshTokenDto) {
  return this.auth.refreshToken(dto.refreshToken);
}

  // -------------------
  // LOGOUT
  // -------------------
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req: any) {
    return this.auth.logout(req.user.sub);
  }
}