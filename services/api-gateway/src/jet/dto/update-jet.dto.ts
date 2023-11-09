import { PartialType } from '@nestjs/swagger';
import { CreateJetDto } from './create-jet.dto';

export class UpdateJetDto extends PartialType(CreateJetDto) {}
