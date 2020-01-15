import React, {Component} from "react";
import {RoomContext} from "../Context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

export default class FeaturedRooms extends Component {
	static contextType = RoomContext;
	render() {
		let {featuredRooms: rooms, loading} = this.context;
		rooms = rooms.map(room => {
			return <Room key={room.id} room={room} />;
		});

		if (rooms.length === 0) {
			return (
				<div className='empty-search'>
					<h3>there are no rooms that are currently featured</h3>
				</div>
			);
		}

		return (
			<section className='featured-rooms'>
				<Title title='featured rooms' />
				<div className='featured-rooms-center'>
					{loading ? <Loading /> : rooms}
				</div>
			</section>
		);
	}
}
