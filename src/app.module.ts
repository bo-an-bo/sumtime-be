import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { DebugModule } from './debug/debug.module';
import { EventModule } from './event/event.module';
import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DebugModule,
    GroupModule,
    MemberModule,
    EventModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
