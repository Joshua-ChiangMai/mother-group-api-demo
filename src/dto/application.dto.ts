import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  motherId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  groupId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  reviewerMotherId?: number;

  @ApiProperty({ example: 'Application for North Sunrise Group' })
  @IsString()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({ example: 'Looking for a north-side weekday group.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'pending' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;

  @ApiPropertyOptional({ example: 'Can interview next Tuesday.' })
  @IsOptional()
  @IsString()
  availabilityNotes?: string;

  @ApiPropertyOptional({ example: '2026-04-21T09:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  interviewScheduledAt?: Date;
}

export class UpdateApplicationDto {
  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  motherId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  groupId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  reviewerMotherId?: number;

  @ApiPropertyOptional({ example: 'Application for North Sunrise Group' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({ example: 'Looking for a north-side weekday group.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'accepted' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;

  @ApiPropertyOptional({ example: 'Can interview next Tuesday.' })
  @IsOptional()
  @IsString()
  availabilityNotes?: string;

  @ApiPropertyOptional({ example: '2026-04-21T09:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  interviewScheduledAt?: Date;
}
