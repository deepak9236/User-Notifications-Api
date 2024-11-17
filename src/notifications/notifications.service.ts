import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog, NotificationLogDocument } from './schemas/notification-log.schema';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name)
    private notificationLogModel: Model<NotificationLogDocument>,
  ) {}

  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<NotificationLog> {
    // Simulating sending logic
    const log = new this.notificationLogModel({
      ...sendNotificationDto,
      status: 'sent',
      sentAt: new Date(),
    });

    return log.save();
  }

  async getLogs(userId: string): Promise<NotificationLog[]> {
    const logs = await this.notificationLogModel.find({ userId }).exec();
    if (!logs.length) {
      throw new NotFoundException(`No notifications found for userId: ${userId}`);
    }
    return logs;
  }

  async getStats(): Promise<Record<string, any>> {
    const stats = await this.notificationLogModel.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]).exec();

    return stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});
  }
}
