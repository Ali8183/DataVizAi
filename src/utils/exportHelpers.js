export const downloadChartAsPng = (elementId, fileName = 'chart.png') => {
    const svg = document.querySelector(`#${elementId} .recharts-surface`);

    if (!svg) {
        console.error('SVG element not found');
        return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Get dimensions from SVG
    const width = svg.clientWidth || 800;
    const height = svg.clientHeight || 400;

    canvas.width = width;
    canvas.height = height;

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
        // Fill white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0);

        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        URL.revokeObjectURL(url);
    };

    img.src = url;
};

export const generateCodeSnippet = (chartType, config) => {
    // Basic template generator based on chart type
    // This is a simplified version. In a real app, this would be more robust.

    const commonImports = `import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';`;

    let specificImport = '';
    let chartComponent = '';

    switch (chartType.id) {
        case 'bar':
            specificImport = `import { BarChart, Bar } from 'recharts';`;
            chartComponent = `
<ResponsiveContainer width="100%" height={400}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="${config.x}" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="${config.y}" fill="#6366f1" />
  </BarChart>
</ResponsiveContainer>`;
            break;

        case 'line':
            specificImport = `import { LineChart, Line } from 'recharts';`;
            chartComponent = `
<ResponsiveContainer width="100%" height={400}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="${config.x}" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="${config.y}" stroke="#6366f1" />
  </LineChart>
</ResponsiveContainer>`;
            break;

        case 'scatter':
            specificImport = `import { ScatterChart, Scatter } from 'recharts';`;
            chartComponent = `
<ResponsiveContainer width="100%" height={400}>
  <ScatterChart>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis type="number" dataKey="${config.x}" name="${config.x}" />
    <YAxis type="number" dataKey="${config.y}" name="${config.y}" />
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    <Legend />
    <Scatter name="Data" data={data} fill="#6366f1" />
  </ScatterChart>
</ResponsiveContainer>`;
            break;

        default:
            return '// Code generation not available for this chart type yet.';
    }

    return `import React from 'react';
${commonImports}
${specificImport}

const MyChart = ({ data }) => {
  return (
    ${chartComponent}
  );
};

export default MyChart;`;
};
