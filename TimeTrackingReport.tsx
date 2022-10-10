import React from 'react';

const TIME_REGEX = new RegExp('(\d{1,2}:\d{2})-(\d{1,2}:\d{2}) (.*)')
export const parseLines = (source: string) => {
	const lines = source.split('\n');
	console.log(lines);
	lines.forEach(line => {
		if (TIME_REGEX.test(line)) {
			const matches = line.match(TIME_REGEX);
			console.log(matches);
		}
	})
}

export const TimeTrackingReport = (props: any) => {
	console.log(props.source);
	parseLines(props.source);
	return (<div><div>{props.source}</div>test</div>);
}

export default TimeTrackingReport;
