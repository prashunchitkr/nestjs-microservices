import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class MakePaymentDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;
}
