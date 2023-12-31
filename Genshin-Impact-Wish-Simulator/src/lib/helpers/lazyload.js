const options = {
	root: null,
	rootMargin: '0px',
	threshold: 0
};

export const lazyLoad = (image, src) => {
	image.style.opacity = '0';
	const placeholder = image.getAttribute('data-placeholder');
	const imageSrc = src || placeholder;

	if (!imageSrc) return;

	const loaded = () => {
		image.style.opacity = '1';
	};
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			// image Loaded
			image.src = imageSrc;
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
