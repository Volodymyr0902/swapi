import crypto from "node:crypto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ClientInfoService {
    digestClientInfo(ip: string, userAgent: string): string {
        const rawClientInfo = `${ip}:${userAgent}`;
        return crypto.createHash('md5').update(rawClientInfo).digest('hex')
    }
}