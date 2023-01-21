import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import Context from '../../util/store';
import SelectList from './SelectList';
import {
	View,
	StyleSheet,
	PlatformColor,
	Platform,
	Text
} from 'react-native';
import listItem, { CalculatorProps } from '../../util/types';
import { ScrollView } from 'react-native-gesture-handler';
import { getPrediction, getSportScore, getSurgeryProbability } from '../../util/services';
import { iosLabelColor, textStyles } from '../globalStyles/TextStyles';

const Calculator: React.FC<{ navigation: CalculatorProps['navigation'] }> = ({
	navigation,
}) => {

	const MRIFeatureScores: number[] = useContext(Context)[
		'MRI'
	].selectedFeatures.map((feature: listItem) => feature.score);
	const USSFeatureScores: number[] = useContext(Context)[
		'USS'
	].selectedFeatures.map((feature: listItem) => feature.score);
	const ClinicalFeatureScores: number[] = useContext(Context)[
		'Clinical'
	].selectedFeatures.map((feature: listItem) => feature.score);

	return (
	<>
		<ScrollView
			style={styles.contentArea}
		>
			<SelectList navigation={navigation} selectDataType={'MRI'} />
			<SelectList navigation={navigation} selectDataType={'USS'} />
			<SelectList navigation={navigation} selectDataType={'Clinical'} />
			<View style={styles.bottomBuffer} />
		</ScrollView>
		{
			(
					<View style={styles.displayArea}>
						<View style={styles.upperButtonAreaStyle}>
							<View
								style={[
									styles.infoSectionStyle,
									styles.upperButtonStyle,
								]}
							>
								<Text style={textStyles.defaultTextStyle}>
									<Text
										style={textStyles.defaultSubTextStyle}
									>
										Total SPoRT Score :
									</Text>
									{'  '}
									<Text style={{ fontWeight: 'bold' }}>
										{getSportScore(
											MRIFeatureScores,
											USSFeatureScores,
											ClinicalFeatureScores
										)}
									</Text>
								</Text>
							</View>
							<View
								style={[
									styles.infoSectionStyle,
									styles.upperButtonStyle,
								]}
							>
								<Text style={[textStyles.defaultTextStyle]}>
									<Text
										style={textStyles.defaultSubTextStyle}
									>
										P (Surgery) :
									</Text>
									{'  '}
									<Text style={{ fontWeight: 'bold' }}>
										{getSurgeryProbability(
											MRIFeatureScores,
											USSFeatureScores,
											ClinicalFeatureScores
										)}
									</Text>
								</Text>
							</View>
						</View>
						<View style={styles.lowerButtonAreaStyle}>
							<View
								style={[
									styles.infoSectionStyle,
									styles.lowerButtonStyle,
								]}
							>
								<Text style={textStyles.defaultTextStyle}>
									<Text
										style={[
											textStyles.defaultSubTextStyle,
											{ fontSize: 16 },
										]}
									>
										Predicion :
									</Text>
									{'  '}
									<Text
										style={{
											fontWeight: 'bold',
											fontSize: 19,
										}}
									>
										{getPrediction(
											MRIFeatureScores,
											USSFeatureScores,
											ClinicalFeatureScores
										)}
									</Text>
								</Text>
							</View>
						</View>
					</View>
				)}
	</>
)}

const styles = StyleSheet.create({
	bottomBuffer: {
		marginTop: 30,
	},
	contentArea: {
		flex: 0.8,
	},
	displayArea: {
		flex: 0.2,
		borderTopWidth: 1,
		...Platform.select({
			ios: {
				borderTopColor: PlatformColor('separator'),
			},
			default: {
				borderTopColor: 'grey',
			},
		}),
		padding: 5,
	},
	upperButtonAreaStyle: {
		margin: 0,
		flex: 0.5,
		flexDirection: 'row',
	},
	lowerButtonAreaStyle: {
		margin: 0,
		flex: 0.5,
	},
	infoSectionStyle: {
		borderRadius: 15,
		...Platform.select({
			ios: {
				backgroundColor: PlatformColor('tertiarySystemFill'),
			},
			default: {
				backgroundColor: 'whitesmoke',
			},
		}),
		padding: 3,
	},
	upperButtonStyle: {
		flex: 0.5,
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	lowerButtonStyle: {
		flex: 1,
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	stackAreaButtonStyle: {
		color: iosLabelColor,
		fontSize: 18.5,
	},
});

export default Calculator;
