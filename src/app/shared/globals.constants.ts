export const SOURCES_IMG = {
	1: "/publishing/assets/images/facebook_filled.png",
	2: "/publishing/assets/images/twitter_filled.png",
	6: "/publishing/assets/images/instagram_filled.png"
}

export const ROLE_TYPE = {
  6: 'ADMIN',
  7: 'SURVEY_MANAGER',
  8: 'SURVEY_ANALYST'
}

export const ACCESS_LEVELS = {
	"CAN_EDIT": "WRITE_ACCESS",
	"NO_ACCESS": "NO_ACCESS",
	"VIEW_ONLY": "READ_ACCESS"
};


export const FEEDBACK_TYPE = {
	"NPS": "NPS",
	"CES": "CES",
	"CSAT": "CSAT"
};

export const ERROR_MSG = `Oops! Some error occured`;

export const getKeyFromValue = (obj, val) => {
	let k;
	for (let key in obj) {
		if (obj[key] == val) {
			k = key;
			break;
		}
	}
	return k;
}
