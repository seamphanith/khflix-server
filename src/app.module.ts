import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { VideosModule } from './videos/videos.module';
import { SeriesModule } from './series/series.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentModule } from './comment/comment.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { NotificationModule } from './notification/notification.module';
import { CloudflareR2Service } from './cloudflare-r2/cloudflare-r2.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    VideosModule,
    SeriesModule,
    CategoriesModule,
    CommentModule,
    WatchlistModule,
    NotificationModule,
  ],
  providers: [CloudflareR2Service],
})
export class AppModule {}
