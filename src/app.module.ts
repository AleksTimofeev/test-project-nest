import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { GatewayModule } from "./gateway/gateway.module";

@Module({
  imports: [GatewayModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
