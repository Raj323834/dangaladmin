import { Locked } from "./Locked";
import { Promo } from "./Promo";

export class SignUpInfo {
  type: string;
  locked: Locked;
  promo: Promo;
  instantDepositAmount: string;
  instantWithdrawalAmount: string;
  instantPromoAmount: string;
  instantBonusAmount: string;
}
