import React from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import {useContext} from "react";
import {RoomContext} from "../Context";
import Loading from "./Loading";

export default function RoomsContainer() {
	const {loading, sortedRooms, rooms} = useContext(RoomContext);
	if (loading) {
		return <Loading />;
	}
	return (
		<>
			<RoomsFilter rooms={rooms} />
			<RoomsList rooms={sortedRooms} />
		</>
	);
}
