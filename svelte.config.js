import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		files: {
			lib: 'src/lib'
		},
		csrf: {
      		checkOrigin: false,
    	}
	}
};

export default config;
