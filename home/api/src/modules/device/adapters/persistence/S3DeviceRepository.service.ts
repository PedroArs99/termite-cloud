import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeviceRepository } from '../../application/ports/DeviceRepository.port';
import { Device } from '../../models/Device.model';
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3DeviceRepository implements DeviceRepository {
  private logger = new Logger(S3DeviceRepository.name);
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_KEY'),
      },
      region: this.configService.get('S3_REGION'),
    });
  }

  async findAll(): Promise<Device[]> {
    const command = new ListObjectsCommand({
      Bucket: this.configService.get('S3_BUCKET_NAME'),
    });

    const result = await this.s3Client.send(command);
    const keys = result.Contents.map((object) => object.Key);
    let devices = keys.map((key) => this.getObject(key));

    return Promise.all(devices);
  }

  findByFriendlyName(friendlyName: string): Device {
    throw new Error('Method not implemented.');
  }

  upsert(device: Device): void {
    throw new Error('Method not implemented.');
  }

  upsertAll(devices: Device[]): void {
    throw new Error('Method not implemented.');
  }

  private async getObject(key: string): Promise<Device> {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: key,
    });

    const result = await this.s3Client.send(getObjectCommand);
    const deviceString = await result.Body.transformToString();
    const iDevice = JSON.parse(deviceString);

    return Device.create(iDevice.friendlyName, iDevice.state);
  }
}
