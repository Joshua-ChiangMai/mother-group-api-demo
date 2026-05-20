import { IsInt, IsOptional, IsString, Length, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ example: 'North Sunrise Group' })
  @IsString()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({ example: 'A prototype morning study group.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  leaderMotherId: number;

  @ApiProperty({ example: 'N' })
  @IsString()
  @Length(1, 1)
  locationRegion: string;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(500)
  capacity?: number;
}

export class UpdateGroupDto {
  @ApiPropertyOptional({ example: 'North Sunrise Group' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({ example: 'A prototype morning study group.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  leaderMotherId?: number;

  @ApiPropertyOptional({ example: 'N' })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  locationRegion?: string;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(500)
  capacity?: number;
}
