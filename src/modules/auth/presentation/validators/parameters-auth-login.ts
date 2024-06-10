import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class ParametersAuthLogin {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, {
    message:
      "El password debe cumplir con el siguiente patrón /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/i",
  })
  password: string;
}
