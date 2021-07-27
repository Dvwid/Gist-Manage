import React, { useEffect, useState } from "react";
import GitHubWrapper from "./githubWrapper";
import DeleteGist from "./DeleteGist";
import ReactPaginate from "react-paginate";
import ExtImages from "../ExtImages";
import FilterGistsButton from "./FilterGistsButton";

const AllGists = () => {
	const [allGists, setAllGists] = useState([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const [filteredGists, setFilteredGists] = useState([]);
	const [searchedFilename, setSearchedFilename] = useState("");
	const wrapper = new GitHubWrapper();

	const [pageNumber, setPageNumber] = useState(0);
	const gistsPerPage = 5;
	const pagesVisited = pageNumber * gistsPerPage;
	const pageCount = Math.ceil(allGists.length / gistsPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

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
		if (filteredGists.length === 0) {
			setFilteredGists(allIds);
		}
	};

	useEffect(() => {
		getAllGistsId();
	}, []);

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
				<div key={gistId}>
					<img src={imgSrc} width={20} height={20} alt="Icon"></img>
					<div>{gistFiles}</div>
					<div>{gistId}</div>
					<DeleteGist
						id={gistId}
						allGists={allGists}
						setAllGists={setAllGists}
						filteredGists={filteredGists}
						setFilteredGists={setFilteredGists}
					/>
					<button>Edit</button>
				</div>
			);
		});

	return (
		<div>
			{displayGists}
			<ReactPaginate
				previousLabel={"Previous"}
				nextLabel={"Next"}
				pageCount={pageCount}
				onPageChange={changePage}
				containerClassName={"paginationButtons"}
				previousLinkClassName={"previousButton"}
				nextLinkClassName={"nextButton"}
				disabledClassName={"paginationDisabled"}
			/>
			<FilterGistsButton
				setIsFiltered={setIsFiltered}
				allGists={allGists}
				setFilteredGists={setFilteredGists}
				searchedFilename={searchedFilename}
				setSearchedFilename={setSearchedFilename}
			/>
			<button
				onClick={() => {
					setIsFiltered(false);
					setFilteredGists(allGists);
				}}
			>
				Cancel filters
			</button>
			<input
				onChange={(e) => setSearchedFilename(e.target.value)}
				value={searchedFilename}
			></input>
		</div>
	);
};

export default AllGists;
