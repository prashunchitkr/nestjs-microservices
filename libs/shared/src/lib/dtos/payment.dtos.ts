import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { User } from '../entities';

export class MakePaymentDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;
}

export class PaymentResponseDto {
  @ValidateNested()
  user: User;

  @IsNumber()
  amount: number;
}
