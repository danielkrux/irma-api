import { Controller, Post, Req, Get, Param } from '@nestjs/common';
import { Request } from 'express';
import { createHash } from 'crypto'
import { sendNotification, setVapidDetails } from 'web-push'

@Controller('notifications')
export class NotificationsController {
  vapidKeys = { privateKey: 'lVfbUc_GkZJm7ST0DWMnvDpChinXE3-0cBQ69AscFJ4', publicKey: 'BH1pLWHVdILTbfMYYxK5o-I-uuqofohNYoRUU-L_-A0TgIQ7Z7KzGKwEoNjmJ-Gqe29B96wye1XuVNUCAgJ-8pk' }
  subscribtions = {
    "74cff3641f136c5119e71c9e3378682c": {
      "endpoint": "https://fcm.googleapis.com/fcm/send/eMLjeLWkhqI:APA91bE2z_HnoEhslLi_syjLJQ7WtFoMB3HTtT2-ElkBLUZlGcyPLEotCAt8ISNMxAu2pHyr6r2joXHGJ-2_TSMMw7WdrugIeRZcybt1fk8nBKiktwMCxQlHN-Lkj8P6pfVEwb1_bytp",
      "exporationTime": null,
      "keys": {
        "p256dh": "BLZBiY1XWucK0-3LhbZyiv66XwnSXbia0d1Ow5gjOqRzr-RUolk6KGLMd0nG7pDe3anQS7LfRyRR7dznOw2zrV0",
        "auth": "3Oh6jMJlveopy4Rd29cY3g"
      }
    }
  }

  constructor() {
    setVapidDetails("mailto:irma@ctg.com", this.vapidKeys.publicKey, this.vapidKeys.privateKey);
  }

  @Post('/subscription')
  subscribtion(@Req() request: Request) {
    const subscribtionRequest = request.body;
    console.log(subscribtionRequest)
    const subscribtionId = this.createHash(JSON.stringify(subscribtionRequest))
    return { id: subscribtionId }
  }

  @Get('/subscription/:id')
  sendPushNotification(@Param() params) {
    const subsribtionId = params.id;
    const pushSubscribtion = this.subscribtions[subsribtionId]
    console.log(pushSubscribtion)
    sendNotification(
      pushSubscribtion,
      JSON.stringify({
        title: "This is a test!",
        text: "Hey! This is a push notification",
      })
    )
  }

  private createHash(input) {
    const md5sum = createHash("md5");
    md5sum.update(Buffer.from(input));
    return md5sum.digest("hex")
  }
}
