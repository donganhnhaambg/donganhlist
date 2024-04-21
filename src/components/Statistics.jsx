import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getInforUser } from '../untils/functions';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = (props) => {
    const [inforUser, setInforUser] = useState(null);
    const [data, setData] = useState();

    useEffect(() => {
        const userData = getInforUser();
        setInforUser(userData);
    }, []);

    useEffect(() => {
        if (inforUser !== null) {
            if (Array.isArray(inforUser.dashboard) && inforUser.dashboard.length > 0) {
                const columnData = {};
                inforUser.dashboard[0].listTask.forEach(task => {
                    if (columnData[task.columnId]) {
                        columnData[task.columnId]++;
                    } else {
                        columnData[task.columnId] = 1;
                    }
                });

                const columnTitles = inforUser.dashboard[0].column.reduce((acc, column) => {
                    acc[column.id] = column.title;
                    return acc;
                }, {});

                const columnIds = Object.keys(columnData);

                const columnCounts = columnIds.map(columnId => columnData[columnId]);

                const sortedColumnTitles = columnIds.map(columnId => columnTitles[columnId]);

                const newData = {
                    labels: sortedColumnTitles,
                    datasets: [
                        {
                            label: 'Number of Tasks',
                            data: columnCounts,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                setData(newData);
            }
        } else {
            const newData = {
                labels: ['Todo', 'Work in progress', 'Done'],
                datasets: [
                    {
                        label: 'Number of Tasks',
                        data: [2, 2, 2],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            setData(newData);
        }
    }, [inforUser]);
    const [color, setColor] = useState("text-black");
    useEffect(() => {
        if (props.darkmode === "active dark mode") {
            setColor("white");
        } else {
            setColor("black");
        }
    }, [props.darkmode]);
    const options = {
        plugins: {
            legend: {
                labels: {
                    color: color,
                    font: {
                        size: 18,
                    },
                }
            },
        },
        layout: {
            padding: {
                left: 0, // Adjust the left padding to increase the space between the label and the chart
                right: 0, // Adjust the right padding if needed
                top: 0,
                bottom: 50
            }
        }
    };
    return (
        <div className="chart mt-10">
            {data && <Pie data={data} options={options} style={{ width: '500px', height: "500px", margin: "0 auto" }} />}
        </div>
    )
}
const mapDispatchToProps = () => {
    return {};
};
const mapStateToProps = (state) => {
    return {
        darkmode: state.darkmode,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
