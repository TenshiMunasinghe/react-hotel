import React, {Component} from "react";
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa";
import Title from "./Title";

export default class Services extends Component {
	state = {
		services: [
			{
				icon: <FaCocktail />,
				title: "free cock tails",
				info:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quia!"
			},
			{
				icon: <FaHiking />,
				title: "endless hikikng",
				info:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quia!"
			},
			{
				icon: <FaShuttleVan />,
				title: "free shuttle",
				info:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quia!"
			},
			{
				icon: <FaBeer />,
				title: "strongest beer",
				info:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quia!"
			}
		]
	};

	render() {
		return (
			<section className='services'>
				<Title title={"services"} />
				<div className='services-center'>
					{this.state.services.map((e, i) => {
						return (
							<article key={i} className='service'>
								<span>{e.icon}</span>
								<h6>{e.title}</h6>
								<p>{e.info}</p>
							</article>
						);
					})}
				</div>
			</section>
		);
	}
}
