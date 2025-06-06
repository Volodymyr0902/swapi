import { AnyResponse } from './any-response.type';
import { StreamableFile } from '@nestjs/common';

export type FinalPayload = StreamableFile | { data: AnyResponse };
