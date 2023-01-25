import { DepositInfo } from "./DepositInfo";
import {  SignUpInfo } from "./SignUpInfo";
import { Restriction } from "./Restriction";

export class Bonus {
  id?: string;
  activeFrom?: string;
  activeTill?: string;
  code?: string;
  type?: string;
  description?: string;
  active?: string;
  expireDays?: string;
  depositInfo:DepositInfo;
  restriction:Restriction;
  signUpInfo:SignUpInfo
}
