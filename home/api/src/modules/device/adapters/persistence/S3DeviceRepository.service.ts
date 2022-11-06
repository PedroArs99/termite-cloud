import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeviceRepository } from '../../application/ports/DeviceRepository.port';
import { Device } from '../../models/Device.model';
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand
} from '@aws-sdk/client-s3';
import { S3Device } from './S3Device.model';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class S3DeviceRepository implements DeviceRepository {
  private logger = new Logger(S3DeviceRepository.name);
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    private configService: ConfigService,
    private eventEmitter: EventEmitter2
  ) {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_KEY'),
      },
      region: this.configService.get('S3_REGION'),
    });

    this.bucketName = this.configService.get('S3_BUCKET_NAME');
  }

  async findAll(): Promise<Device[]> {
    const command = new ListObjectsCommand({
      Bucket: this.bucketName,
    });

    const result = await this.s3Client.send(command);
    const keys = result.Contents.map((object) => object.Key);
    let devices = keys.map((key) => this.getObject(key));

    return Promise.all(devices);
  }

  async findByFriendlyName(friendlyName: string): Promise<Device> {
    return this.getObject(friendlyName);
  }

  async upsert(device: Device): Promise<void> {
    const deviceDto =  new S3Device(device.friendlyName, device.state)
    const command = new PutObjectCommand({
      Body: JSON.stringify(deviceDto),
      Bucket: this.bucketName,
      Key: device.friendlyName
    })

    const result = await this.s3Client.send(command);
    if(result.$metadata.httpStatusCode !== 200){
      throw Error(`Device ${device.friendlyName} was not successfully upserted on S3`)
    } else {
      device.getEvents().forEach(event => this.eventEmitter.emit(event.eventName, event))
      this.logger.log(`Device ${device.friendlyName} upserted on S3`);
    }
  }

  async upsertAll(devices: Device[]): Promise<void> {
    devices.forEach(device => this.upsert(device))
  }

  private async getObject(key: string): Promise<Device> {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const result = await this.s3Client.send(getObjectCommand);
    const deviceString = await result.Body.transformToString();
    const iDevice = JSON.parse(deviceString);

    return Device.create(iDevice.friendlyName, iDevice.state);
  }
}
