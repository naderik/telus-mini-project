import React from "react";
import "../styles/Home.css";
import LazyTable from "../components/LazyTable";

function Home() {
    return (
        <div className="home">
            <LazyTable/>
        </div>
    );
}

export default Home;