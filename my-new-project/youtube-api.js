import axios from 'axios';

const API_URL = 'https://www.googleapis.com/youtube/v3/search';
// const API_KEY = 'YOUR SAVED API KEY';

const youtubeSearch = term => {
	const params = {
		part: 'snippet',
		key: AIzaSyCCdbYl6Cu14MpzMn7QzgKdADhHUd0bpWA,
		q: term,
		type: 'video',
	};

	return new Promise((resolve, reject) => {
		axios
			.get(API_URL, { params })
			.then(response => {
				resolve(response.data.items);
			})
			.catch(error => {
				console.log(`youtube api error: ${error}`);
				reject(error);
			});
	});
};

export default youtubeSearch;
