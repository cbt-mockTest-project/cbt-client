import React, { ComponentProps } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Tooltip,
  Legend
);

const StudyResultChartBlock = styled.div`
  overflow-x: auto;
  display: flex;
  justify-content: center;
`;

interface StudyResultChartProps {
  scoreCounts: {
    highScoreLength: number;
    lowScoreLength: number;
    coreScoreLength: number;
  };
}

const labels = ['O  ', 'X  ', '안 품'];
const StudyResultChart: React.FC<StudyResultChartProps> = ({ scoreCounts }) => {
  const data = {
    labels,
    datasets: [
      {
        data: [
          scoreCounts.highScoreLength,
          scoreCounts.lowScoreLength,
          scoreCounts.coreScoreLength,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(201, 203, 207, 1)',
        ],
      },
    ],
  };

  const options: ComponentProps<typeof Pie>['options'] = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#fff',
        },
      },
      datalabels: {
        color: '#fff',
      },
      title: {
        display: true,
        text: '점수 분포도',
      },
    },
  };

  return (
    <StudyResultChartBlock>
      <div className="study-result-chart-wrapper">
        <Pie options={options} data={data} />
      </div>
    </StudyResultChartBlock>
  );
};

export default StudyResultChart;
