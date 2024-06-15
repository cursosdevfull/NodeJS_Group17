import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MinLength,
  ValidateNested,
} from "class-validator";

export class ParametersRole {
  @IsNotEmpty()
  @IsUUID()
  roleId: string;
}

export class ParametersAuthRegister {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, {
    message:
      "El password debe cumplir con el siguiente patrón /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/i",
  })
  password: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ParametersRole)
  roles: ParametersRole[];
}
