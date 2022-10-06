import React from "react";
import BarChart from "../components/BarChart";

var chartData = [];

// check if the object with the same status exists in the array and if it does, increment the count by 1, otherwise add a new object to the array
const countStatus = (status) => {
    let found = false;
    chartData.forEach((item) => {
        if (item.status === status) {
            item.count++;
            found = true;
        }
    });
    if (!found) {
        chartData.push({ status: status, count: 1 });
    }
}

function Chart1() {
    const [state, setState] = React.useState()

    React.useEffect(() => {
        fetch("http://localhost:8585/api/contracts", {
            method: 'GET',
            mode: 'cors'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setState(data)
                })
            }
        })
    }, [])

    for (var i = 0; i < state?.data?.length; i++) {
        countStatus(state?.data?.[i][4]);
    }

    console.log(chartData)
    console.log(state?.data)
    return (
        <div>
            <h1>Chart1</h1>
            <BarChart data={chartData} />
        </div>
    );
}

export default Chart1;