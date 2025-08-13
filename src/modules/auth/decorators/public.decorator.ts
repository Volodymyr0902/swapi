import { SetMetadata } from '@nestjs/common';
import { SKIP_ACCESS } from '../constants';

export const SkipAccess = () => SetMetadata(SKIP_ACCESS, true);
