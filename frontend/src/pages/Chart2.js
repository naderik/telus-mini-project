import React from "react";
import PieChart from "../components/PieChart";

const tempData = []

const data = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 }];



function Chart2() {
    const [state, setState] = React.useState()
    const [chartData, setChartData] = React.useState([])

    const countNames = (name) => {
        let found = false;
        tempData.forEach((item) => {
            if (item.label === name) {
                item.value++;
                found = true;
            }
        });
        if (!found) {
            tempData.push({ label: name, value: 1 });
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
            countNames(state?.data?.[i][5]);
        }
        setChartData(tempData)
    }, [state])




    console.log(chartData)

    return (
        <>
            <h1>Chart2</h1>
            <PieChart data={chartData} />
        </>
    );
}

export default Chart2;