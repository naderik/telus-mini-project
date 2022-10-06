import React from "react";
import BarChart from "../components/BarChart";

const tempData = []


function Chart1() {
    const [state, setState] = React.useState()
    const [chartData, setChartData] = React.useState([])

    // check if the object with the same status exists in the array and if it does, increment the count by 1, otherwise add a new object to the array
    const countStatus = (status) => {
        let found = false;
        tempData.forEach((item) => {
            if (item.status === status) {
                item.count++;
                found = true;
            }
        });
        if (!found) {
            tempData.push({ status: status, count: 1 });
        }
    }




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

    React.useEffect(() => {

        for (var i = 0; i < state?.data?.length; i++) {
            countStatus(state?.data?.[i][4]);
        }
        setChartData(tempData)
    }, [state])




    console.log(chartData)
    return (
        <div>
            <h1>Chart1</h1>
            <BarChart data={chartData} />
        </div>
    );
}

export default Chart1;