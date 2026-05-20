import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGroupMeetingDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  groupId: number;

  @ApiProperty({ example: 'Wednesday Gathering' })
  @IsString()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({ example: 'Weekly bible study meeting.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Wednesday' })
  @IsString()
  @MaxLength(20)
  meetingDay: string;

  @ApiProperty({ example: '09:00' })
  @IsString()
  @MaxLength(10)
  startTime: string;

  @ApiProperty({ example: '11:00' })
  @IsString()
  @MaxLength(10)
  endTime: string;

  @ApiPropertyOptional({ example: 'North Community Hall' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  locationText?: string;
}

export class UpdateGroupMeetingDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  groupId?: number;

  @ApiPropertyOptional({ example: 'Wednesday Gathering' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({ example: 'Weekly bible study meeting.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Wednesday' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  meetingDay?: string;

  @ApiPropertyOptional({ example: '09:00' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  startTime?: string;

  @ApiPropertyOptional({ example: '11:00' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  endTime?: string;

  @ApiPropertyOptional({ example: 'North Community Hall' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  locationText?: string;
}
