const getFromSheet = async () => {
	try {
		const data = await fetch(
			'https://opensheet.elk.sh/1qQZXxfa8pKrjFkCh4cLYyEbPIaFLMWimVaQmvFkRzlU/1'
		);
		const result = await data.json();
		return result.reverse().map(({ message, name, amount, currency, timestamp, platform }) => {
			const formatedAmount = setAmmount(amount, currency);
			const date = formatDate(timestamp);
			return { message, name, amount: formatedAmount, date, platform };
		});
	} catch (e) {
		console.error('failed to process data');
		return [];
	}
};

export const formatNumber = (n) => n.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const setAmmount = (amount, currency) => {
	const amNumber = parseInt(amount).toFixed(2).toString();
	const formated = formatNumber(amNumber);
	return `${currency} ${formated}`;
};

const formatDate = (date) => {
	const dt = new Date(date);
	return dt.toLocaleDateString();
};

export const supporterList = async () => {
	const kofi = await getFromSheet();
	return kofi;
};
