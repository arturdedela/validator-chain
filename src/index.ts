import { ValidatorBuilder } from "./ValidatorBuilder";

interface RegisterRequest {
  login: string;
  password: string;
  personalInfo: {
    married: boolean;
    hobbies: string[];
  }
}

const builder = new ValidatorBuilder<RegisterRequest>();

builder
  .addValidation(req => req.password, pass => pass.length > 8)
  .addValidation(req => req.login, login => login.length > 5)
  .addValidation(req => req.personalInfo, personalInfo => typeof personalInfo === "object")
  .addValidation(req => req.personalInfo.hobbies, hobbies => hobbies.length < 3);

const validator = builder.getValidator();

function validate(value: RegisterRequest) {
  console.log("___________________________");
  console.log(value);
  try {
    validator.validate(value);
    console.log("VALID!")
  } catch (e) {
    console.log(e);
    console.log("INVALID!")
  }
  console.log("___________________________");
}


validate({ login: "asd", password: "test", personalInfo: { hobbies: ['programming'], married: false } });
validate({ login: "asd123", password: "test45543", personalInfo: { hobbies: ['programming'], married: true } });
validate({ login: "123123", password: "123123123123", personalInfo: { hobbies: ['programming', '2', '3', '4'], married: false } });
