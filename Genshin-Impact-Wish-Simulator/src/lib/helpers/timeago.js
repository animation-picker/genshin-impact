//Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
const date_formats = {
	past: [
		{ ceiling: 60, text: '$seconds seconds ago' },
		{ ceiling: 3600, text: '$minutes minutes ago' },
		{ ceiling: 86400, text: '$hours hours ago' },
		{ ceiling: 2629744, text: '$days days ago' },
		{ ceiling: 31556926, text: '$months months ago' },
		{ ceiling: null, text: '$years years ago' }
	],
	future: [
		{ ceiling: 60, text: 'in $seconds seconds' },
		{ ceiling: 3600, text: 'in $minutes minutes' },
		{ ceiling: 86400, text: 'in $hours hours' },
		{ ceiling: 2629744, text: 'in $days days' },
		{ ceiling: 31556926, text: 'in $months months' },
		{ ceiling: null, text: 'in $years years' }
	]
};

//Time units must be be ordered largest -> smallest
const time_units = [
	[31556926, 'years'],
	[2629744, 'months'],
	[86400, 'days'],
	[3600, 'hours'],
	[60, 'minutes'],
	[1, 'seconds']
];

const depluralize_time_ago_text = (time_ago_text, breakdown) => {
	for (const i in breakdown) {
		if (breakdown[i] === 1) {
			const regexp = new RegExp('\\b' + i + '\\b');
			time_ago_text = time_ago_text.replace(regexp, (arg) => arg.replace(/s\b/g, ''));
		}
	}
	return time_ago_text;
};

const get_time_breakdown = (diff) => {
	let seconds = diff;
	const breakdown = {};
	for (let i = 0; i < time_units.length; i++) {
		const occurences_of_unit = Math.floor(seconds / time_units[i][0]);
		seconds = seconds - time_units[i][0] * occurences_of_unit;
		breakdown[time_units[i][1]] = occurences_of_unit;
	}
	return breakdown;
};

const render_date = (date_format, diff) => {
	const breakdown = get_time_breakdown(diff);
	const time_ago_text = date_format.text.replace(/\$(\w+)/g, (a, b) => breakdown[b]);
	return depluralize_time_ago_text(time_ago_text, breakdown);
};

function get_format(diff, tense) {
	for (let i = 0; i < date_formats[tense].length; i++) {
		const noCeiling = date_formats[tense][i].ceiling === null;
		const lessThanCeiling = diff <= date_formats[tense][i].ceiling;
		if (noCeiling || lessThanCeiling) return date_formats[tense][i];
	}
	return null;
}

export const timeAgo = (pastDate, dateLater = null) => {
	const date = new Date(pastDate);
	const ref_date = dateLater ? new Date(dateLater) : new Date();
	const seconds_diff = (ref_date - date) / 1000;

	const isFutureTime = seconds_diff < 0;
	const tense = isFutureTime ? 'future' : 'past';
	const diff = isFutureTime ? 0 - seconds_diff : seconds_diff;

	const timeFormat = get_format(diff, tense);
	return render_date(timeFormat, diff);
};

