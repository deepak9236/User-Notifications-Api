import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserPreferenceDocument = UserPreference & Document;

@Schema({ timestamps: true })
export class UserPreference {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true, match: /.+\@.+\..+/ })
  email: string;

  @Prop({
    required: true,
    type: {
      marketing: { type: Boolean, default: false },
      newsletter: { type: Boolean, default: false },
      updates: { type: Boolean, default: false },
      frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'never'], default: 'never' },
      channels: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: false },
      },
    },
  })
  preferences: Record<string, any>;

  @Prop({ required: true })
  timezone: string;

  @Prop()
  lastUpdated: Date;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);
