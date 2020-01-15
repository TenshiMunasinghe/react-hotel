import React, {Component} from "react";
import defaultBcg from "../setup/images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from "react-router-dom";
import {RoomContext} from "../Context";

export default class SingleRoom extends Component {
	state = {
		slug: this.props.match.params.slug,
		defaultBcg
	};

	static contextType = RoomContext;

	render() {
		const {getRoom} = this.context;
		const room = getRoom(this.state.slug);

		if (!room) {
			return (
				<div className='error'>
					<h3>no such room could be found...</h3>
					<Link to='/rooms' className='btn-primary'>
						back to rooms
					</Link>
				</div>
			);
		}

		const {
			name,
			description,
			capacity,
			size,
			price,
			extras,
			breakfast,
			pets,
			images
		} = room;
		const [mainImg, ...defImg] = images;

		return (
			<>
				<Hero hero='roomsHero' image={mainImg || this.state.defaultBcg}>
					<Banner title={`${name} room`}>
						<Link to='/rooms' className='btn-primary'>
							back to rooms
						</Link>
					</Banner>
				</Hero>
				<section className='single-room'>
					<div className='single-room-images'>
						{defImg.map((image, i) => (
							<img key={i} src={image} alt={name} />
						))}
					</div>
					<div className='single-room-info'>
						<article className='desc'>
							<h3>details</h3>
							<p>{description}</p>
						</article>
						<article className='info'>
							<h3>info</h3>
							<h6>price: ${price}</h6>
							<h6>size: {size} SQFT</h6>
							<h6>
								max capacity: {capacity} {capacity === 1 ? "person" : "people"}
							</h6>
							<h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
							{breakfast && <h6>free break fast</h6>}
						</article>
					</div>
				</section>
				<section className='room-extras'>
					<h6>extras</h6>
					<ul className='extras'>
						{extras.map((item, i) => {
							return <li key={i}>- {item}</li>;
						})}
					</ul>
				</section>
			</>
		);
	}
}
