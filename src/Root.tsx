import {Composition} from 'remotion';
import {calculateMetadata, JumpCuts, SAMPLE_SECTIONS} from './JumpCuts';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="JumpCuts"
				component={JumpCuts}
				durationInFrames={30 * 30}
				fps={30}
				width={1280}
				height={720}
				calculateMetadata={calculateMetadata}
				defaultProps={{
					sections: SAMPLE_SECTIONS,
				}}
			/>
		</>
	);
};
