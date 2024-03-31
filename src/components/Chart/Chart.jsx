import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ZoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register({
    ZoomPlugin,
    ChartDataLabels
})
const GraphChart = (props) => {
    const file = props.data;
    console.log(file)
    const [data, setData] = useState([])
    const [graph, setGraph] = useState(null)

    useEffect(() => {
        if (file) {
            axios.get("http://localhost:8080/detail?fileName=" + file.storedName)
                .then(response => {
                    const responseData = response.data; // Lấy dữ liệu từ response
                    setData(responseData); // Cập nhật dữ liệu vào state data

                    // Xử lý dữ liệu từ response để thiết lập dữ liệu cho biểu đồ
                    const labels = Object.keys(responseData);
                    const dataValues = Object.values(responseData);

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
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [file]);
    if (!graph) {
        return <div>Loading...</div>; // Nếu graph chưa được khởi tạo, hiển thị thông báo Loading
    }

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
                            mode: 'xy',
                            rangeMin: { x: 0, y: 0 }, // Giới hạn zoom
                            rangeMax: { x: null, y: null },

                        }
                    },
                    datalabels: {
                        display: true,
                        color: 'black',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function(value, context) {
                            return value; // Hiển thị giá trị của thanh bar
                        }
                    }
                },
                maintainAspectRatio: true,
                scales: {
                    x: [
                        {
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                            }
                        }
                    ],
                    y: [
                        {
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                            },
                        },
                    ],
                },
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
