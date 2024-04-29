import { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ZoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register({
    ZoomPlugin,
    ChartDataLabels
})
const LineChart = (props) => {
    const { displayData, yLabel } = props
    const [graph, setGraph] = useState({
        datasets: [] // this is require
    })


    useEffect(() => {
        // const labels = Object.keys(data);
        // const dataValues = Object.values(data);
        setGraph({
            labels: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5],
            datasets: [
                {
                    label: 'Apriori',
                    data: displayData.apriori,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 3,
                    tension: 0.2,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointHoverRadius: 10
                },
                {
                    label: 'FP-Tree',
                    data: displayData.fpTree,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.2,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointHoverRadius: 10
                }
            ],
        });
    }, [displayData])

    return (
        <Line
            data={graph}
            // Height of graphS
            options={{
                maintainAspectRatio: true,

                plugins: {

                    legend: {

                        labels: {

                            font: {
                                size: 15
                            }
                        }
                    },
                    datalabels: {
                        align: 'top',
                        anchor: 'end'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: "true",
                            text: yLabel,
                        },
                        ticks: {
                            font: {
                                size: 13,

                            },
                            color: "black"
                        }

                    },
                    x: {
                        title: {
                            display: "true",
                            text: "Minsup"
                        },
                        ticks: {
                            font: {
                                size: 13,

                            },
                            color: "black"
                        }
                    }
                },
                elements: {
                    point: {
                        pointStyle: "rect"
                    }
                }

            }}
        />
    )

}
export default LineChart;
