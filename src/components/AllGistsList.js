import React from "react";
import "./styles/AllGists/allGists.scss";
import ExtImages from "../ExtImages";
import DeleteGist from "./DeleteGist";

const AllGistsList = ({
	filteredGists,
	pagesVisited,
	gistsPerPage,
	allGists,
	setAllGists,
	setFilteredGists,
	setEditingFile,
	setFileIsEditing,
	setEditingContent,
	setEditingFilename,
}) => {
	const displayGists = filteredGists
		.slice(pagesVisited, pagesVisited + gistsPerPage)
		.map((gist, index) => {
			const gistId = gist.id;
			const gistFiles = Object.keys(filteredGists[index].files);
			var re = /(?:\.([^.]+))?$/;
			const extension = re.exec(gistFiles);
			let imgSrc = ExtImages[extension[1]];
			if (!imgSrc) imgSrc = ExtImages.basic;

			return (
				<div key={gistId} className="allGists_list_elements_gist">
					<img
						src={imgSrc}
						alt="Icon"
						className="allGists_list_elements_gist_image"
						onClick={() => {
							const selected = allGists.filter((gist) => gist.id === gistId);

							const rawUrl = selected[0].files[gistFiles].raw_url;

							fetch(rawUrl)
								.then((res) => res.text())
								.then((data) => {
									setEditingFilename(gistFiles[0]);
									setEditingContent(data);
									setEditingFile(selected);
									setFileIsEditing(true);
									console.log(gistFiles[0]);
								});
						}}
					></img>
					<div className="allGists_list_elements_gist_fileName">
						{gistFiles}
					</div>

					<DeleteGist
						id={gistId}
						allGists={allGists}
						setAllGists={setAllGists}
						filteredGists={filteredGists}
						setFilteredGists={setFilteredGists}
					/>
				</div>
			);
		});

	return <div className="allGists_list_elements">{displayGists}</div>;
};

export default AllGistsList;
