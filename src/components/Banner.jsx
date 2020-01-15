import React from "react";

const Banner = ({title, subTitle, children}) => {
	return (
		<div className='banner'>
			<h1>{title}</h1>
			<div />
			<p>{subTitle}</p>
			{children}
		</div>
	);
};

export default Banner;
