import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerifyEmailDto {
  @ApiProperty({ example: "token12345" })
  @IsString()
  @IsNotEmpty()
  token!: string;
}
