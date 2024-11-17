import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Controller('api/preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.preferencesService.findOne(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    return this.preferencesService.update(userId, updatePreferenceDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.preferencesService.delete(userId);
  }
}
