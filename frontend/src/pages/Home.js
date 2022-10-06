import React from "react";
import "../styles/Home.css";
import LazyTable from "../components/LazyTable";

function Home() {
    return (
        <div className="home">
            <h1>Data Table</h1>
            <LazyTable/>
        </div>
    );
}

export default Home;