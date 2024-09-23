import React, {useMemo} from 'react';
import {
	CalculateMetadataFunction,
	OffthreadVideo,
	staticFile,
	useCurrentFrame,
} from 'remotion';

const fps = 30;

type Section = {
	startFrom: number;
	endAt: number;
};

export const SAMPLE_SECTIONS: Section[] = [
	{startFrom: 0, endAt: 5 * fps},
	{
		startFrom: 7 * fps,
		endAt: 10 * fps,
	},
	{
		startFrom: 13 * fps,
		endAt: 18 * fps,
	},
];

type Props = {
	sections: Section[];
};

export const calculateMetadata: CalculateMetadataFunction<Props> = ({
	props,
}) => {
	const durationInFrames = props.sections.reduce((acc, section) => {
		return acc + section.endAt - section.startFrom;
	}, 0);

	return {
		fps,
		durationInFrames,
	};
};

export const JumpCuts: React.FC<Props> = ({sections}) => {
	const frame = useCurrentFrame();

	const startFrom = useMemo(() => {
		let summedUpDurations = 0;
		for (const section of sections) {
			summedUpDurations += section.endAt - section.startFrom;
			if (summedUpDurations > frame) {
				return section.endAt - summedUpDurations;
			}
		}

		return null;
	}, [frame, sections]);

	if (startFrom === null) {
		return null;
	}

	return (
		<OffthreadVideo
			pauseWhenBuffering
			startFrom={startFrom}
			// Remotion will automatically add a time fragment to the end of the video URL
			// based on `startFrom` and `endAt`. Opt out of this by adding one yourself.
			src={`${staticFile('time.mp4')}#t=0,`}
		/>
	);
};
