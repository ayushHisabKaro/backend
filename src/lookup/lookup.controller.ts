import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { LookupService } from './lookup.service';
import { CreateLookupDto } from './dto/create-lookup.dto';
import { UpdateLookupDto } from './dto/update-lookup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lookup')
@Controller('lookup')
export class LookupController {
  constructor(private readonly lookupService: LookupService) {}

  @Post()
  create(@Body() createLookupDto: CreateLookupDto) {
    return this.lookupService.create(createLookupDto);
  }

  @Get()
  findAll() {
    return this.lookupService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.lookupService.findOneByName(name);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateLookupDto: UpdateLookupDto,
  ) {
    const lookup = await this.lookupService.findOneByName(name);
    if (!lookup) throw new BadRequestException('Lookup not found!');
    return this.lookupService.update(lookup.id, updateLookupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lookupService.remove(+id);
  }
}

@Controller({
  path: 'lookup',
  version: '2',
})
@ApiTags('Lookup V2')
export class LookupControllerV2 {
  constructor(private readonly lookupService: LookupService) {}

  @Post()
  create(@Body() createLookupDto: CreateLookupDto) {
    return this.lookupService.create(createLookupDto);
  }

  @Get()
  findAll() {
    return this.lookupService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.lookupService.findOneByName(name);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateLookupDto: UpdateLookupDto,
  ) {
    const lookup = await this.lookupService.findOneByName(name);
    if (!lookup) throw new BadRequestException('Lookup not found!');
    return this.lookupService.update(lookup.id, updateLookupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lookupService.remove(+id);
  }
}
