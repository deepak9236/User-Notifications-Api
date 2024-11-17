import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesService } from './preferences/preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreference } from './preferences/schemas/user-preference.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

const mockUserPreference = {
  userId: 'user123',
  email: 'user@example.com',
  preferences: {
    marketing: true,
    newsletter: false,
    updates: true,
    frequency: 'weekly',
    channels: {
      email: true,
      sms: false,
      push: true,
    },
  },
  timezone: 'America/New_York',
  lastUpdated: new Date(),
  createdAt: new Date(),
};

const mockPreferenceModel = {
  create: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
};

describe('PreferencesService', () => {
  let service: PreferencesService;
  let model: Model<UserPreference>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferencesService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: mockPreferenceModel,
        },
      ],
    }).compile();

    service = module.get<PreferencesService>(PreferencesService);
    model = module.get<Model<UserPreference>>(getModelToken(UserPreference.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPreference', () => {
    it('should create a new user preference', async () => {
      jest.spyOn(model, 'create').mockResolvedValueOnce(mockUserPreference as any);

      const result = await service.createPreference(mockUserPreference as any);
      expect(result).toEqual(mockUserPreference);
      expect(model.create).toHaveBeenCalledWith(mockUserPreference);
    });
  });

  describe('getPreference', () => {
    it('should return a user preference', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockUserPreference as any);

      const result = await service.getPreference('user123');
      expect(result).toEqual(mockUserPreference);
      expect(model.findOne).toHaveBeenCalledWith({ userId: 'user123' });
    });

    it('should throw NotFoundException if user preference does not exist', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

      await expect(service.getPreference('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePreference', () => {
    it('should update a user preference', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(mockUserPreference as any);

      const result = await service.updatePreference('user123', { timezone: 'UTC' });
      expect(result).toEqual(mockUserPreference);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: 'user123' },
        { timezone: 'UTC' },
        { new: true },
      );
    });

    it('should throw NotFoundException if user preference does not exist', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(null);

      await expect(service.updatePreference('nonexistent', { timezone: 'UTC' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deletePreference', () => {
    it('should delete a user preference', async () => {
      jest.spyOn(model, 'deleteOne').mockResolvedValueOnce({
        acknowledged: true,
        deletedCount: 1,
      });

      const result = await service.deletePreference('user123');
      expect(result).toEqual({ message: 'User preferences deleted successfully' });
      expect(model.deleteOne).toHaveBeenCalledWith({ userId: 'user123' });
    });

    it('should throw NotFoundException if user preference does not exist', async () => {
      jest.spyOn(model, 'deleteOne').mockResolvedValueOnce({
        acknowledged: true,
        deletedCount: 0,
      });

      await expect(service.deletePreference('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });
});
