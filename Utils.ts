export class Utils {
	public static cardToString(card: number): string {
	  if (card == 10) {
	  	return 'T';
	  } else if (card == 11) {
	  	return 'J';
	  } else if (card == 12) {
	  	return 'Q';
	  } else if (card == 13) {
	  	return 'K';
	  } else if (card == 14) {
	  	return 'A';
	  } else {
	  	return card.toString();
	  }
	}

	public static cardToNumber(card: string): number {
		if (card == 'T') {
			return 10;
		} else if (card == 'J') {
			return 11;
		} else if (card == 'Q') {
			return 12;
		} else if (card == 'K') {
			return 13;
		} else if (card == 'A') {
			return 14;
		} else {
			return Number(card);
		}
	}
}