import { Module } from '@nestjs/common';
import { UserSchema } from '../users.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users.module';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { RefreshTokenSchema } from './tokens.interface';
import { JWT_EXPIRACY_MS } from 'src/constants';
import { RefreshService } from './refresh.service';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'Tokens', schema: RefreshTokenSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: JWT_EXPIRACY_MS },
      })
    }),
  ],
  providers: [AuthService, RefreshService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
