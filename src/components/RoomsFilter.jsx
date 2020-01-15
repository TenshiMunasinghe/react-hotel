import React from "react";
import {useContext} from "react";
import {RoomContext} from "../Context";
import Title from "./Title";

const getUnique = (items, value) => {
	return [...new Set(items.map(item => item[value]))];
};

export default function RoomsFilter({rooms}) {
	const context = useContext(RoomContext);
	const {
		handleChange,
		type,
		capacity,
		price,
		minPrice,
		maxPrice,
		minSize,
		maxSize,
		breakfast,
		pets
	} = context;

	let types = getUnique(rooms, "type");
	types = ["all", ...types];
	types = types.map((item, i) => {
		return (
			<option key={i} value={item}>
				{item}
			</option>
		);
	});
	let people = getUnique(rooms, "capacity");
	people = [...people];
	people = people.map((item, i) => {
		return (
			<option key={i} value={item}>
				{item}
			</option>
		);
	});

	return (
		<section className='filter-container'>
			<Title title='search rooms' />
			<form className='filter-form'>
				{/* select type */}
				<div className='form-group'>
					<label htmlFor='type'>room type</label>
					<select
						name='type'
						id='type'
						value={type}
						className='form-control'
						onChange={handleChange}>
						{types}
					</select>
				</div>
				{/* end select type */}
				{/* select guests */}
				<div className='form-group'>
					<label htmlFor='capacity'>Guests</label>
					<select
						name='capacity'
						id='capacity'
						value={capacity}
						className='form-control'
						onChange={handleChange}>
						{people}
					</select>
				</div>
				{/* end select guests */}
				{/* room price */}
				<div className='form-group'>
					<label htmlFor='price'>room price ${price}</label>
					<input
						type='range'
						name='price'
						id='price'
						className='form-control'
						min={minPrice}
						max={maxPrice}
						value={price}
						onChange={handleChange}
					/>
				</div>
				{/* end room price */}
				{/* select size */}
				<div className='form-group'>
					<label htmlFor='size'>room size</label>
					<div className='size-inputs' id='size'>
						<input
							type='number'
							name='minSize'
							id='min-size'
							value={minSize}
							onChange={handleChange}
							className='size-input'
						/>
						<input
							type='number'
							name='maxSize'
							id='max-size'
							value={maxSize}
							onChange={handleChange}
							className='size-input'
						/>
					</div>
				</div>
				{/* end size */}
				{/* extras */}
				<div className='form-group'>
					<div className='single-extra'>
						<input
							type='checkbox'
							name='breakfast'
							id='breakfast'
							onChange={handleChange}
						/>
						<label htmlFor='breakfast'>breakfast</label>
					</div>
					<div className='single-extra'>
						<input
							type='checkbox'
							name='pets'
							id='pets'
							onChange={handleChange}
						/>
						<label htmlFor='pets'>pets</label>
					</div>
				</div>
				{/* end extras */}
			</form>
		</section>
	);
}
