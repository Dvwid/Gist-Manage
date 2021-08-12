import React, { useEffect, useState, useCallback } from "react";
import GitHubWrapper from "./githubWrapper";
import ReactPaginate from "react-paginate";
import AllGistsNav from "./AllGistsNav";
import AllGistsList from "./AllGistsList";
import UpdateGist from "./UpdateGist";
import "./styles/AllGists/allGists.scss";

const AllGists = () => {
	const [allGists, setAllGists] = useState([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const [filteredGists, setFilteredGists] = useState([]);
	const [searchedFilename, setSearchedFilename] = useState("");
	const wrapper = new GitHubWrapper();

	const [pageNumber, setPageNumber] = useState(0);
	const gistsPerPage = 28;
	const pagesVisited = pageNumber * gistsPerPage;
	const pageCount = Math.ceil(filteredGists.length / gistsPerPage);

	const [fileIsEditing, setFileIsEditing] = useState(false);
	const [editingFile, setEditingFile] = useState("");
	const [editingContent, setEditingContent] = useState("");
	const [editingFilename, setEditingFilename] = useState("");

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	const getAllGistsId = useCallback(async () => {
		const allIds = [];
		await wrapper.getRequest("/gists").then((res) => {
			res.data.forEach(({ id, files, created_at, updated_at }) => {
				const obj = {
					id,
					files,
					created_at,
					updated_at,
				};
				allIds.push(obj);
			});
		});
		setAllGists(allIds);
		if (filteredGists.length === 0) {
			setFilteredGists(allIds);
			console.log(isFiltered);
		}
		//eslint-disable-next-line
	}, [filteredGists.length, isFiltered]);

	useEffect(() => {
		getAllGistsId();
	}, [getAllGistsId]);

	return fileIsEditing ? (
		<UpdateGist
			setFileIsEditing={setFileIsEditing}
			editingFile={editingFile}
			editingContent={editingContent}
			editingFilename={editingFilename}
			reload={getAllGistsId}
			setAllGists={setAllGists}
			setFilteredGists={setFilteredGists}
		/>
	) : (
		<div className="allGists">
			<AllGistsNav
				setIsFiltered={setIsFiltered}
				allGists={allGists}
				setFilteredGists={setFilteredGists}
				searchedFilename={searchedFilename}
				setSearchedFilename={setSearchedFilename}
			/>
			<div className="allGists_list">
				<AllGistsList
					filteredGists={filteredGists}
					setFilteredGists={setFilteredGists}
					pagesVisited={pagesVisited}
					gistsPerPage={gistsPerPage}
					allGists={allGists}
					setAllGists={setAllGists}
					setFileIsEditing={setFileIsEditing}
					setEditingFile={setEditingFile}
					setEditingContent={setEditingContent}
					setEditingFilename={setEditingFilename}
				/>
				<ReactPaginate
					previousLabel={"<"}
					nextLabel={">"}
					pageCount={pageCount}
					onPageChange={changePage}
					containerClassName={"paginationButtons"}
					previousLinkClassName={"previousButton"}
					nextLinkClassName={"nextButton"}
					disabledClassName={"paginationDisabled"}
				/>
			</div>
		</div>
	);
};

export default AllGists;
