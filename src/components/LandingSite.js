import React from "react";
import { Link } from "react-router-dom";
import "./styles/LandingSite/landingSite.scss";
import ghIcon from "../icons/githubicon.png";
import { ReactComponent as Menu } from "../icons/menu.svg";
import { ReactComponent as Plus } from "../icons/plus.svg";

const LandingSite = () => {
	return (
		<div className="landingSite">
			<p className="landingSite_header">
				Manage your <span className="landingSite_header_title">GitHub</span>Gist
				files
			</p>
			<div className="landingSite_navigate">
				<Link to="/new">
					<button className="landingSite_navigate_button">
						<Plus className="landingSite_navigate_button_icon" />
						Create new file
					</button>
				</Link>
				<Link to="all">
					<button className="landingSite_navigate_button">
						<Menu className="landingSite_navigate_button_icon" />
						Show existing files
					</button>
				</Link>
			</div>
			<div className="landingSite_footer">
				<p>CREATED BY</p>
				<p>DAWID HUTYRA 3921</p>
				<a href="https://github.com/Dvwid" target="_blank" rel="noreferrer">
					<img
						src={ghIcon}
						alt="GithubIcon"
						className="landingSite_footer_ghIcon"
					/>
				</a>
			</div>
		</div>
	);
};

export default LandingSite;
