import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator';

export class ChatMessageDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNumber()
    createdAt: number;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    authorName: string;
}

export class ChatDto {
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => ChatMessageDto)
    @ValidateNested({ each: true })
    messages: ChatMessageDto[];
}