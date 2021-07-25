import React, { useEffect, useState } from "react";
import GitHubWrapper from "./githubWrapper";
import DeleteGist from "./DeleteGist";

const ShowAllGists = () => {
	const [allGists, setAllGists] = useState([]);
	const wrapper = new GitHubWrapper();

	const getAllGistsId = async () => {
		const allIds = [];
		await wrapper.getRequest("/gists").then((res) => {
			res.data.forEach(({ id, files, owner }) => {
				const obj = {
					id,
					files,
					owner,
				};
				allIds.push(obj);
			});
		});
		setAllGists(allIds);
	};

	useEffect(() => {
		getAllGistsId();
		// eslint-disable-next-line
	}, []);

	if (allGists.length > 0) {
		const gistInfo = allGists.map((gist, index) => {
			const gistId = gist.id;
			const gistFiles = Object.keys(allGists[index].files);
			return (
				<div key={gistId}>
					<div>{gistFiles}</div>
					<div>{gistId}</div>
					<DeleteGist
						id={gistId}
						allGists={allGists}
						setAllGists={setAllGists}
					/>
					<button>Edit</button>
				</div>
			);
		});
		return gistInfo;
	}

	return (
		<>
			{allGists.length === 0 ? (
				<div>You don’t have any gists yet or we're still loading the data</div>
			) : null}
		</>
	);
};

export default ShowAllGists;
