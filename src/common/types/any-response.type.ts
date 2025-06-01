import type { ExistingEntity } from './existing-entity.type';
import type { StreamableFile } from '@nestjs/common';
import type { GeneralResponseDto } from '../dto/general-response.dto';

export type AnyResponse = ExistingEntity | ExistingEntity[] | GeneralResponseDto | StreamableFile;
