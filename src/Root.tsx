import {Composition} from 'remotion';
import {calculateMetadata, HelloWorld} from './HelloWorld';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				calculateMetadata={calculateMetadata}
				defaultProps={{}}
			/>
		</>
	);
};
