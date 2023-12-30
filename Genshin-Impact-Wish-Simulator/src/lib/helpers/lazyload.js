const options = {
	root: null,
	rootMargin: '0px',
	threshold: 0
};

export const lazyLoad = (image, src) => {
	image.style.opacity = '0';
	if (!src) return;
	const loaded = () => {
		image.style.opacity = '1';
	};
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			// image Loaded
			image.src = src;
			if (image.complete) {
				image.style.transition = 'unset';
				loaded();
			} else image.addEventListener('load', loaded);
		}
	}, options);

	observer.observe(image);

	return {
		destroy() {
			image.removeEventListener('load', loaded);
		}
	};
};
