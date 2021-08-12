import React, { useState } from "react";
import "./styles/AllGists/allGists.scss";
import { Link } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../icons/left-arrow.svg";
import AllGistsFilterButton from "./AllGistsFilterButton";

const AllGistsNav = ({
	setIsFiltered,
	allGists,
	setFilteredGists,
	searchedFilename,
	setSearchedFilename,
}) => {
	const [isFilteredBy, setIsFilteredBy] = useState("");

	return (
		<div className="allGists_nav">
			<Link to="/">
				<LeftArrow className="allGists_nav_leftArrow" />
			</Link>
			<div className="allGists_nav_header">
				All <span className="allGists_nav_header_title">Gists</span>
			</div>
			<div className="allGists_nav_filters">
				<div className="allGists_nav_filters_title">Search</div>
				<div className="allGists_nav_filters_byFilename">
					<p>FILENAME</p>
					<input
						type="text"
						placeholder="Search"
						onChange={(e) => setSearchedFilename(e.target.value)}
						value={searchedFilename}
					/>
				</div>

				<div className="allGists_nav_filters_sort">
					<div className="allGists_nav_filters_sort_title">Sort Gists</div>
					<select
						className="allGists_nav_filters_sort_selectList"
						value={isFilteredBy}
						onChange={(e) => {
							setIsFilteredBy(e.target.value);
						}}
					>
						<option value="recentlyCreated">Recently created</option>
						<option value="latestCreated">Latest created</option>
						<option value="recentlyUpdated">Recently updated</option>
						<option value="latestUpdated">Latest updated</option>
					</select>
				</div>
			</div>

			<div className="allGists_nav_confirm">
				<AllGistsFilterButton
					setIsFiltered={setIsFiltered}
					allGists={allGists}
					setFilteredGists={setFilteredGists}
					searchedFilename={searchedFilename}
					setSearchedFilename={setSearchedFilename}
					isFilteredBy={isFilteredBy}
					setIsFilteredBy={setIsFilteredBy}
				/>
			</div>
		</div>
	);
};

export default AllGistsNav;
