import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Home_Events} from './pages/Home.jsx'
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={client}>
			<BrowserRouter>
				<Routes>
		          <Route path="/" element={<Home_Events/>} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
