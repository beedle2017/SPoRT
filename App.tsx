// @ts-nocheck
import React, { useContext, useState } from 'react';
import {
	Platform,
	PlatformColor,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Calculator from './components/Calculator/Calculator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Selector from './components/Selector/Selector';
import Info from './components/Info/Info';
import {
	iosLabelColor,
	textStyles,
} from './components/globalStyles/TextStyles';
import Context from './util/store';
import listItem, {
	CalculatorProps,
	RootStackParamList,
	SelectorProps,
} from './util/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	getPrediction,
	getSportScore,
	getSurgeryProbability,
} from './util/services';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ScreenRenderer: React.FC<{ component: JSX.Element }> = ({
	component,
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
		<View style={styles.container}>
			<ScrollView
				style={
					component.type.name === 'Calculator'
						? styles.contentArea
						: []
				}
			>
				{component}
			</ScrollView>
			{component.type.name === 'Calculator' &&
				[
					...MRIFeatureScores,
					...USSFeatureScores,
					...ClinicalFeatureScores,
				].length > 0 && (
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
		</View>
	);
};

const App: React.FC<{}> = () => {
	const [MRIFeatures, setMRIFeatures] = useState<listItem[]>([]);
	const [USSFeatures, setUSSFeatures] = useState<listItem[]>([]);
	const [ClincalFeatures, setClinicalFeatures] = useState<listItem[]>([]);

	const resetFeatures = (): void => {
		setClinicalFeatures([]);
		setUSSFeatures([]);
		setMRIFeatures([]);
	};

	return (
		<Context.Provider
			value={{
				MRI: {
					selectedFeatures: MRIFeatures,
					setSelectedFeatures: setMRIFeatures,
				},
				USS: {
					selectedFeatures: USSFeatures,
					setSelectedFeatures: setUSSFeatures,
				},
				Clinical: {
					selectedFeatures: ClincalFeatures,
					setSelectedFeatures: setClinicalFeatures,
				},
			}}
		>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='Calculator'
					screenOptions={{
						headerStyle: headerStyles.header,
						headerTitleStyle: headerStyles.title,
					}}
				>
					<Stack.Screen
						name='Calculator'
						options={({
							navigation,
						}: {
							navigation: CalculatorProps['navigation'];
						}) => ({
							headerRight: () => (
								<View style={{flexDirection : 'row-reverse'}}>
									<TouchableHighlight
										underlayColor={'transparent'}
										onPress={() => navigation.navigate('Info')}
									>
										<Icon
											name='info-outline'
											size={25}
											color={iosLabelColor}
										/>
									</TouchableHighlight>
								</View>
							),
							headerLeft : () => (
								<View style={{flexDirection : 'row-reverse'}}>
									<TouchableHighlight
										underlayColor={'transparent'}
										onPress={() => resetFeatures([])}
									>
										<Text style={styles.stackAreaButtonStyle}>
											Reset
										</Text>
									</TouchableHighlight>
								</View>
							)
						})}
					>
						{(props) => (
							<ScreenRenderer
								component={<Calculator {...props} />}
							/>
						)}
					</Stack.Screen>
					<Stack.Screen name='Info'>
						{(props) => (
							<ScreenRenderer component={<Info {...props} />} />
						)}
					</Stack.Screen>
					<Stack.Screen
						name='Selector'
						options={({
							navigation,
						}: {
							navigation: SelectorProps['navigation'];
						}) => ({
							headerRight: () => (
								<TouchableHighlight
									underlayColor={'transparent'}
									onPress={() => navigation.goBack()}
								>
									<Text style={styles.stackAreaButtonStyle}>
										Done
									</Text>
								</TouchableHighlight>
							),
						})}
					>
						{(props) => (
							<ScreenRenderer
								component={<Selector {...props} />}
							/>
						)}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</Context.Provider>
	);
};

const headerStyles = StyleSheet.create({
	header: {
		...Platform.select({
			ios: {
				backgroundColor: PlatformColor('secondarySystemBackground'),
			},
			default: {
				backgroundColor: 'whitesmoke',
			},
		}),
	},
	title: {
		...Platform.select({
			ios: {
				color: PlatformColor('label'),
			},
			default: {
				color: 'black',
			},
		}),
	},
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...Platform.select({
			ios: {
				backgroundColor: PlatformColor('systemBackground'),
			},
			default: {
				backgroundColor: 'white',
			},
		}),
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

export default App;
