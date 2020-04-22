import { Controller, Post, Req, Get, Param } from '@nestjs/common';
import { Request } from 'express';
import { createHash } from 'crypto'
import { sendNotification, setVapidDetails } from 'web-push'
import { UsersService } from '../users/users.service';

@Controller('notifications')
export class NotificationsController {
  vapidKeys = { privateKey: 'lVfbUc_GkZJm7ST0DWMnvDpChinXE3-0cBQ69AscFJ4', publicKey: 'BH1pLWHVdILTbfMYYxK5o-I-uuqofohNYoRUU-L_-A0TgIQ7Z7KzGKwEoNjmJ-Gqe29B96wye1XuVNUCAgJ-8pk' }
  subscriptions = {
    "74cff3641f136c5119e71c9e3378682c": {
      "endpoint": "https://fcm.googleapis.com/fcm/send/eMLjeLWkhqI:APA91bE2z_HnoEhslLi_syjLJQ7WtFoMB3HTtT2-ElkBLUZlGcyPLEotCAt8ISNMxAu2pHyr6r2joXHGJ-2_TSMMw7WdrugIeRZcybt1fk8nBKiktwMCxQlHN-Lkj8P6pfVEwb1_bytp",
      "exporationTime": null,
      "keys": {
        "p256dh": "BLZBiY1XWucK0-3LhbZyiv66XwnSXbia0d1Ow5gjOqRzr-RUolk6KGLMd0nG7pDe3anQS7LfRyRR7dznOw2zrV0",
        "auth": "3Oh6jMJlveopy4Rd29cY3g"
      }
    }
  }

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

  @Get('/subscription/:id')
  sendPushNotification(@Param() params) {
    const subscriptionId = params.id;
    const pushSubscription = this.subscriptions[subscriptionId]
    sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "Update from IRMA",
        text: "Incident added for your team, check it out!",
        url: "http://localhost:3000/",
      })
    )
  }

  private createHash(input) {
    const md5sum = createHash("md5");
    md5sum.update(Buffer.from(input));
    return md5sum.digest("hex")
  }
}
