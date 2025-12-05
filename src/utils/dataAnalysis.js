import _ from 'lodash';
import { mean, median, min, max, std } from 'mathjs';

export const analyzeDataset = (data) => {
    if (!data || data.length === 0) return [];

    const columns = Object.keys(data[0]);
    const analysis = columns.map(col => {
        const values = data.map(row => row[col]);
        const type = detectType(values);
        const stats = calculateStats(values, type);

        return {
            name: col,
            type,
            ...stats
        };
    });

    return analysis;
};

const detectType = (values) => {
    // Filter out null/undefined/empty strings for type detection
    const validValues = values.filter(v => v !== null && v !== undefined && v !== '');

    if (validValues.length === 0) return 'string'; // Default to string if empty

    const isNumber = validValues.every(v => !isNaN(Number(v)) && typeof v !== 'boolean');
    if (isNumber) {
        // Check if integer
        const isInteger = validValues.every(v => Number.isInteger(Number(v)));
        return isInteger ? 'integer' : 'float';
    }

    const isDate = validValues.every(v => !isNaN(Date.parse(v)));
    if (isDate) return 'date';

    const isBoolean = validValues.every(v =>
        v === true || v === false ||
        String(v).toLowerCase() === 'true' || String(v).toLowerCase() === 'false'
    );
    if (isBoolean) return 'boolean';

    return 'string'; // Default to categorical/string
};

const calculateStats = (values, type) => {
    const total = values.length;
    const validValues = values.filter(v => v !== null && v !== undefined && v !== '');
    const missing = total - validValues.length;
    const unique = _.uniq(validValues).length;

    let stats = {
        missing,
        missingPercentage: (missing / total) * 100,
        unique,
        uniquePercentage: (unique / total) * 100,
    };

    if (type === 'integer' || type === 'float') {
        const numValues = validValues.map(v => Number(v));
        stats = {
            ...stats,
            min: min(numValues),
            max: max(numValues),
            mean: mean(numValues),
            median: median(numValues),
            std: std(numValues),
        };
    }

    return stats;
};
