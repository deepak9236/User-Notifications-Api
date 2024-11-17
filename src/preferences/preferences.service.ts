import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference, UserPreferenceDocument } from './schemas/user-preference.schema';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel(UserPreference.name)
    private userPreferenceModel: Model<UserPreferenceDocument>,
  ) {}

  async create(createPreferenceDto: CreatePreferenceDto): Promise<UserPreference> {
    const createdPreference = new this.userPreferenceModel(createPreferenceDto);
    return createdPreference.save();
  }

  async findOne(userId: string): Promise<UserPreference> {
    const preference = await this.userPreferenceModel.findOne({ userId }).exec();
    if (!preference) {
      throw new NotFoundException(`User preference not found for userId: ${userId}`);
    }
    return preference;
  }

  async update(userId: string, updatePreferenceDto: UpdatePreferenceDto): Promise<UserPreference> {
    const updatedPreference = await this.userPreferenceModel
      .findOneAndUpdate({ userId }, updatePreferenceDto, { new: true })
      .exec();
    if (!updatedPreference) {
      throw new NotFoundException(`User preference not found for userId: ${userId}`);
    }
    return updatedPreference;
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userPreferenceModel.deleteOne({ userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User preference not found for userId: ${userId}`);
    }
  }
}
