export class Cardunicharacter {

  public static cardcode(string) {
    return string.replace("L-", "\u{2764}").replace("F-", "\u{2663}").replace("S-", "\u{1F536}\u{FE0F}").replace("K-", "\u{2660}").replace("-0", "").replace("14", "A").replace("11", "J").replace("12", "Q").replace("13", "K")
  }

  public static cardcodeArray(arr: any): any {
    const newarr = arr
    for (var i = 0; i < newarr.length; i++) {
      newarr[i] = newarr[i].replace("L-", "\u{2764} ").replace("F-", "\u{2663} ").replace("S-", "\u{1F536}\u{FE0F} ").replace("K-", "\u{2660} ").replace("-0", "").replace(" 14", "_A").replace("11", "J").replace("12", "Q").replace(" 13", "-K").replace("10", "I0");
    }

    newarr.sort();

    for (var i = 0; i < newarr.length; i++) {
      newarr[i] = newarr[i].replace('_A', 'A').replace('-K', 'K');
    }

    return newarr;
  }

}