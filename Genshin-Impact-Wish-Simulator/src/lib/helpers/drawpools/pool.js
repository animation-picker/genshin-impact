
const member = [];

let pool = [];

const initPool = (memArr) => {
	memArr.forEach(({ name, chineseChar }) => {
		pool.push({name, chineseChar});
	});

    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // console.log(pool);
};


initPool(member);

export const draw = (n) => {

	// n > 0
	if (n == 1) {
		if (pool.length === 0) initPool(member);
		const m = pool.pop();
		const nd = Math.random();
		m.rarity = nd < 0.5 ? 3 : nd < 0.8 ? 4 : 5;
		return [m];
	}

    let res = [];

    if (n > pool.length) {
		pool.forEach(({name, chineseChar}) => {
			res.push({chineseChar, name})
		})
		initPool(member);
    } 

	let needN = n-res.length;
	if (needN <= 0) return res;

	for (let i = 0; i < needN; i++) {
		res.push(pool.pop());
	}

	res[0].rarity = 5;
	for (let i = 1; i < res.length; i++) {
		res[i].rarity = Math.random() < 0.6 ? 3 : 4;
	}

	return res;
}

