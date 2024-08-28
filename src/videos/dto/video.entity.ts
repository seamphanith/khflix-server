import { Video } from "@prisma/client";


export class VideoEntity implements Video {
    id: string;
    title: string;
    url: string;
    m3u8Url: string;
    thumbnail: string;
    categoryId: string;
    seriesId: string;
    createdAt: Date;
    updatedAt: Date;

}