import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  send(@Body() sendNotificationDto: SendNotificationDto) {
    return this.notificationsService.sendNotification(sendNotificationDto);
  }

  @Get(':userId/logs')
  getLogs(@Param('userId') userId: string) {
    return this.notificationsService.getLogs(userId);
  }

  @Get('stats')
  getStats() {
    return this.notificationsService.getStats();
  }
}
