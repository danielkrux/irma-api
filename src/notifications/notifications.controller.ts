import { Controller, Post, Req, Get, Param } from '@nestjs/common';
import { Request } from 'express';
import { createHash } from 'crypto'
import { sendNotification, setVapidDetails } from 'web-push'
import { UsersService } from '../users/users.service';

@Controller('notifications')
export class NotificationsController {
  vapidKeys = { privateKey: 'lVfbUc_GkZJm7ST0DWMnvDpChinXE3-0cBQ69AscFJ4', publicKey: 'BH1pLWHVdILTbfMYYxK5o-I-uuqofohNYoRUU-L_-A0TgIQ7Z7KzGKwEoNjmJ-Gqe29B96wye1XuVNUCAgJ-8pk' }

  constructor(
    private usersService: UsersService,
    ) {
    setVapidDetails("mailto:irma@ctg.com", this.vapidKeys.publicKey, this.vapidKeys.privateKey);
  }

  @Post('/subscription')
  async subscription(@Req() request: Request) {
    const subscriptionRequest = request.body.subscription;
    const userId = request.body.userId;
    const subscriptionId = this.createHash(JSON.stringify(subscriptionRequest));
    this.usersService.updateUserNotificationSubscribtion(userId, {subscriptionId, ...subscriptionRequest})
    return { id: subscriptionId }
  }

  @Post('/subscription/send')
  async sendPushNotification(@Req() request: Request) {
    const userIds = request.body.members
    const users = await this.usersService.getUsersById(userIds)
    const notificationsSubs = users.map(u => u.notificationSubscription)

    for(const sub of notificationsSubs) {
      sendNotification(
        sub,
        JSON.stringify({
          title: "Update from IRMA",
          text: "Incident added for your team, check it out!",
          url: "http://localhost:3000/",
        })
      )
    }
  }

  private createHash(input) {
    const md5sum = createHash("md5");
    md5sum.update(Buffer.from(input));
    return md5sum.digest("hex")
  }
}
