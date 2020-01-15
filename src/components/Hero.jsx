import * as React from "react";

const Hero = ({children, hero, image}) => {
	return (
		<header
			className={hero}
			style={image && {backgroundImage: `url(${image})`}}>
			{children}
		</header>
	);
};

Hero.defaultProps = {
	hero: "defaultHero"
};

export default Hero;
