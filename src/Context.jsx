import React, {Component} from "react";
// import items from "./setup/data";
import Client from "./contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
	state = {
		rooms: [],
		sortedRooms: [],
		featuredRooms: [],
		loading: true,
		type: "all",
		capacity: 1,
		price: 0,
		minPrice: 0,
		maxPrice: 0,
		minSize: 0,
		maxSize: 0,
		breakfast: false,
		pets: false
	};

	componentDidMount = () => {
		this.getData();
	};

	getData = async () => {
		try {
			let rooms = await Client.getEntries({
				content_type: "beachResortRoom"
			});
			rooms = this.formatData(rooms.items);
			let featuredRooms = rooms.filter(room => room.featured);
			let maxPrice = Math.max(...rooms.map(item => item.price));
			let maxSize = Math.max(...rooms.map(item => item.size));

			this.setState({
				rooms,
				featuredRooms,
				sortedRooms: rooms,
				loading: false,
				price: maxPrice,
				maxPrice,
				maxSize
			});
		} catch (e) {
			console.error(e);
		}
	};

	formatData = items => {
		let tempItems = items.map(item => {
			let id = item.sys.id;
			let images = item.fields.images.map(image => image.fields.file.url);
			let room = {...item.fields, images, id};
			return room;
		});
		return tempItems;
	};

	getRoom = slug => {
		return this.state.rooms.find(room => room.slug === slug);
	};

	handleChange = e => {
		const name = e.target.name;
		const value =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		this.setState({[name]: value}, this.filterRooms);
	};

	filterRooms = () => {
		let {
			rooms,
			type,
			capacity,
			price,
			minSize,
			maxSize,
			minPrice,
			maxPrice,
			breakfast,
			pets
		} = this.state;

		let tempRooms = [...rooms];
		capacity = parseInt(capacity);
		price = parseInt(price);
		if (type !== "all") {
			tempRooms = tempRooms.filter(room => {
				return room.type === type;
			});
		}

		if (capacity !== 1) {
			tempRooms = tempRooms.filter(room => {
				return room.capacity >= capacity;
			});
		}

		tempRooms = tempRooms.filter(room => {
			return room.price <= price;
		});

		tempRooms = tempRooms.filter(room => {
			return room.size >= minSize && room.size <= maxSize;
		});

		if (breakfast) {
			tempRooms = tempRooms.filter(room => room.breakfast);
		}
		if (pets) {
			tempRooms = tempRooms.filter(room => room.pets);
		}

		this.setState({sortedRooms: tempRooms});
	};

	render() {
		return (
			<RoomContext.Provider
				value={{
					...this.state,
					getRoom: this.getRoom,
					handleChange: this.handleChange
				}}>
				{this.props.children}
			</RoomContext.Provider>
		);
	}
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext};
