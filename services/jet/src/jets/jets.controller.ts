import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JetsService } from './jets.service';
import { CreateJetDto } from './dto/create-jet.dto';
import { UpdateJetDto } from './dto/update-jet.dto';

@Controller('jets')
export class JetsController {
  constructor(private readonly jetsService: JetsService) {}

  @Post()
  async create(@Body() createJetDto: CreateJetDto) {
    const userId = 2;
    const data = await this.jetsService.create(createJetDto, userId);
    return data;
  }

  @Get()
  async findAll() {
    return await this.jetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJetDto: UpdateJetDto) {
    return this.jetsService.update(+id, updateJetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jetsService.remove(+id);
  }
}
