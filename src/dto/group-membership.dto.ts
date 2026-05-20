import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGroupMembershipDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  motherId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  groupId: number;

  @ApiProperty({ example: 'North Sunrise Membership' })
  @IsString()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({ example: 'Accepted applicant now active in the group.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @ApiPropertyOptional({ example: '2026-04-22T09:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  joinedAt?: Date;
}

export class UpdateGroupMembershipDto {
  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  motherId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  groupId?: number;

  @ApiPropertyOptional({ example: 'North Sunrise Membership' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({ example: 'Accepted applicant now active in the group.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @ApiPropertyOptional({ example: '2026-04-22T09:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  joinedAt?: Date;
}
