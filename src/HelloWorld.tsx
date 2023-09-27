import {CalculateMetadataFunction, Sequence, staticFile, Video} from 'remotion';
import {useCurrentFrame} from 'remotion';

type Portion = {
	to: number;
	from: number;
};

export const portions: Portion[] = [
	{to: 10, from: 0},
	{to: 70, from: 40},
	{to: 90, from: 80},
];

type TimelineItem = {
	from: number;
	videoTime: number;
	to: number;
};

type Props = Record<string, unknown>;

const getTimeline = (portions: Portion[]): TimelineItem[] => {
	const timeline: TimelineItem[] = [];

	let duration = 0;
	for (const portion of portions) {
		timeline.push({videoTime: duration, from: portion.from, to: portion.to});
		duration += portion.to - portion.from;
	}

	return timeline;
};

export const calculateMetadata: CalculateMetadataFunction<Props> = () => {
	const lastPortion = getTimeline(portions).at(-1) as TimelineItem;

	return {
		durationInFrames:
			lastPortion.videoTime + (lastPortion.to - lastPortion.from),
	};
};

export const HelloWorld: React.FC<Props> = () => {
	const frame = useCurrentFrame();
	const timeline = getTimeline(portions);

	const currentPortion = timeline
		.reverse()
		.find((portion) => portion.videoTime <= frame);

	if (!currentPortion) {
		return null;
	}

	return (
		<Sequence from={currentPortion.videoTime}>
			<Video
				startFrom={currentPortion.from}
				endAt={currentPortion.to}
				src={staticFile('framer.mp4')}
			/>
		</Sequence>
	);
};
