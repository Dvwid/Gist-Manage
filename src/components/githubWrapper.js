const axios = require("axios");

export default class GitHubWrapper {
	constructor() {
		this.token = "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";
		this.client = axios.create({
			baseURL: "https://api.github.com/",
			responseType: "json",
			headers: {
				// "X-Custom-Header": this.token, <--- There may be a problem with CORS in browsers
				Accept: "application/vnd.github.v3+json",
				Authorization: "token " + this.token,
			},
		});
	}

	getRequest(path) {
		return this.client.get(path);
	}
	postRequest(path, payload) {
		return this.client.post(path, payload);
	}

	patchRequest(path, payload) {
		return this.client.patch(path, payload);
	}
	deleteRequest(path) {
		return this.client.delete(path);
	}
	root() {
		return this.getRequest("/");
	}
	createGist(payload) {
		return this.postRequest("/gists", payload);
	}

	deleteGist(gistId) {
		return this.deleteRequest(`/gists/${gistId}`);
	}
	updateGist(gistId, payload) {
		return this.patchRequest(`/gists/${gistId}`, payload);
	}
	getGist(gistId) {
		return this.getRequest(`/gists/${gistId}`);
	}
}
