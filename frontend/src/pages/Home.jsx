/**------------------------------------------------------------
 * Home.jsx
 * Aaron Cumming
 *
 * Displays all reminders
 *------------------------------------------------------------**/

import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getReminders } from "../data/reminders";

// This page makes use of the conditional rendering pattern
// to handle different data fetching states, such as:
// - Loading
// - Error
// - Success
export function Home() {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["reminders"],
		queryFn: getReminders,
	});

	if (isLoading) {
		return (
			<>
				<h1>Loading...</h1>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<h1>Uh Oh!</h1>
				<p>{error.message}</p>
			</>
		);
	}

	return (
		<>
			<h1>Reminders</h1>
			{data.map((event) => (
				<h2 key={event.id}>{event.id}</h2>
			))}
		</>
	);
}