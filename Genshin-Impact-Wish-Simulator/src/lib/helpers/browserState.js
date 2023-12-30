const browserState = {
	set(page) {
		history.pushState({ page }, null, null);
	},
	back() {
		const currentPage = history.state?.page;
		if (!currentPage) return;
		history.back();
	}
};

export default browserState;
