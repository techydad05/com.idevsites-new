export async function getPhotos(limit, size = { width: 1280, height: 800 }) {
	const url = 'https://raw.githubusercontent.com/Valexr/Slidy/master/assets/static/photos.json';
	const indexes = Array.from({ length: limit }, () => Math.floor(Math.random() * 24644));
	const res = await fetch(url);
	const photos = await res.json();

	return photos.reduce((acc, [src, aspectRatio, author], i) => {
		if (indexes.includes(i)) {
			const source = { width: size.height * (aspectRatio / 10), height: size.height };
			const max = { width: size.width, height: size.height };
			const query = `?w=${ratio(aspect(source, max).width)}`;
			acc.push({
				src: `https://images.unsplash.com/photo-${src}${query}`,
				alt: `Image by ${author} from Unsplash`,
				...aspect(source, max)
			});
		}
		return acc;
	}, []);


	function ratio(size) {
		return size * devicePixelRatio;
	}

	function aspect(src, max) {
		const ratio = Math.min(max.width / src.width, max.height / src.height);
		return {
			width: Math.round(src.width * ratio),
			height: Math.round(src.height * ratio),
		};
	}
}