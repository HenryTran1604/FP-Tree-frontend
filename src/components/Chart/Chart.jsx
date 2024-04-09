import { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ZoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register({
    ZoomPlugin,
    ChartDataLabels
})
const GraphChart = (props) => {
    const data = props.data
    console.log(data)
    const [graph, setGraph] = useState({
        datasets: [] // this is require
    })


    useEffect(() => {
        const labels = Object.keys(data);
        const dataValues = Object.values(data);
        setGraph({
            labels: labels,
            datasets: [
                {
                    label: 'total',
                    data: dataValues,
                    backgroundColor: ["aqua", "green", "red", "yellow"],
                    borderColor: ["aqua", "green", "red", "yellow"],
                    borderWidth: 0.5,
                },
            ],
        });
    }, [data])

    return (
        <Bar
            data={
                graph
            }
            // Height of graph
            width={500}
            options={{
                plugins: {
                    zoom: {
                        limits: {
                            x: {min: 0, max: 10000},
                            y: {min: 0, max: 10000}
                        },
                        pan: {
                            enabled: true,
                            mode: 'xy', // Chế độ kéo chỉ theo trục x hoặc y hoặc xy
                            // speed: 10, // Tốc độ kéo
                        },
                        zoom: {

                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'xy'

                        }
                    },
                    datalabels: {
                        display: true,
                        color: 'black',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function (value, context) {
                            return value; // Hiển thị giá trị của thanh bar
                        }
                    }
                },
                maintainAspectRatio: true,
                
                legend: {
                    labels: {
                        fontSize: 15,
                    },
                },

            }}
        />
    )

}
export default GraphChart;
