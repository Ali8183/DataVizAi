
export const recommendCharts = (columns) => {
    const recommendations = [];

    // Categorize columns by type
    const numerical = columns.filter(c => c.type === 'integer' || c.type === 'float');
    const categorical = columns.filter(c => c.type === 'string' || c.type === 'boolean');
    const temporal = columns.filter(c => c.type === 'date');

    // 1 Variable Rules
    if (numerical.length >= 1) {
        recommendations.push({
            id: 'histogram',
            name: 'Histogram',
            description: 'Shows the distribution of a numerical variable',
            score: 10,
            icon: 'BarChart',
            requiredChannels: { x: 'numerical' }
        });
        recommendations.push({
            id: 'boxplot',
            name: 'Box Plot',
            description: 'Summarizes a set of data measured on an interval scale',
            score: 8,
            icon: 'BoxSelect',
            requiredChannels: { y: 'numerical' }
        });
    }

    if (categorical.length >= 1) {
        recommendations.push({
            id: 'bar',
            name: 'Bar Chart',
            description: 'Compares values across categories',
            score: 10,
            icon: 'BarChart2',
            requiredChannels: { x: 'categorical', y: 'count' } // y is implicit count
        });
        recommendations.push({
            id: 'pie',
            name: 'Pie Chart',
            description: 'Shows proportions of a whole (use sparingly)',
            score: 5,
            icon: 'PieChart',
            requiredChannels: { color: 'categorical', angle: 'count' }
        });
    }

    // 2 Variable Rules
    if (numerical.length >= 2) {
        recommendations.push({
            id: 'scatter',
            name: 'Scatter Plot',
            description: 'Shows relationship between two numerical variables',
            score: 10,
            icon: 'ScatterChart',
            requiredChannels: { x: 'numerical', y: 'numerical' }
        });
    }

    if (numerical.length >= 1 && categorical.length >= 1) {
        recommendations.push({
            id: 'groupedBar',
            name: 'Grouped Bar',
            description: 'Compares numerical values across categories',
            score: 9,
            icon: 'BarChartHorizontal',
            requiredChannels: { x: 'categorical', y: 'numerical' }
        });
    }

    if (numerical.length >= 1 && temporal.length >= 1) {
        recommendations.push({
            id: 'line',
            name: 'Line Chart',
            description: 'Shows trends over time',
            score: 10,
            icon: 'LineChart',
            requiredChannels: { x: 'temporal', y: 'numerical' }
        });
        recommendations.push({
            id: 'area',
            name: 'Area Chart',
            description: 'Shows volume trends over time',
            score: 8,
            icon: 'AreaChart',
            requiredChannels: { x: 'temporal', y: 'numerical' }
        });
    }

    if (categorical.length >= 2) {
        recommendations.push({
            id: 'heatmap',
            name: 'Heatmap',
            description: 'Shows correlation between two categorical variables',
            score: 8,
            icon: 'Grid',
            requiredChannels: { x: 'categorical', y: 'categorical', color: 'count' }
        });
    }

    // 3+ Variable Rules
    if (numerical.length >= 3) {
        recommendations.push({
            id: 'bubble',
            name: 'Bubble Chart',
            description: 'Scatter plot with a third dimension (size)',
            score: 9,
            icon: 'Circle',
            requiredChannels: { x: 'numerical', y: 'numerical', size: 'numerical' }
        });
    }

    return recommendations.sort((a, b) => b.score - a.score);
};
