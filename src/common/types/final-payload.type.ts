import type { AnyResponse } from './any-response.type';
import type { StreamableFile } from '@nestjs/common';

export type FinalPayload = StreamableFile | { data: AnyResponse };
