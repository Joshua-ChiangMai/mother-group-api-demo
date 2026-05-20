import { IsEmail, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMotherDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({ example: 'Interested in a weekday morning bible study group.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '080-111-2222' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @ApiPropertyOptional({ example: 'N' })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  locationPreference?: string;

  @ApiPropertyOptional({ example: 'Weekday mornings work best.' })
  @IsOptional()
  @IsString()
  availabilityNotes?: string;
}

export class UpdateMotherDto {
  @ApiPropertyOptional({ example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({ example: 'Interested in a weekday morning bible study group.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'jane@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '080-111-2222' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @ApiPropertyOptional({ example: 'N' })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  locationPreference?: string;

  @ApiPropertyOptional({ example: 'Weekday mornings work best.' })
  @IsOptional()
  @IsString()
  availabilityNotes?: string;
}
