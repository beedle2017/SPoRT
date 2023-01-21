import React, { useContext } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	PlatformColor,
	Pressable,
	ScrollView
} from 'react-native';
import { iosLabelColor, textStyles } from '../globalStyles/TextStyles';
import Context from '../../util/store';
import listItem, { SelectorProps } from '../../util/types';
import * as Haptics from 'expo-haptics';
import featureData from '../../util/constants';

const Selector: React.FC<{ route: SelectorProps['route'] }> = ({ route }) => {
	const { dataType }: { dataType: string } = route.params;
	const upperLimit: number = featureData[dataType].upperLimit;
	const { selectedFeatures, setSelectedFeatures } =
		useContext(Context)[dataType];

	const handleSelectPress = (id: string): void => {
		let is_Present: boolean =
			selectedFeatures
				.map((feature: listItem) => feature.id)
				.filter((featureId: string) => featureId === id).length > 0;
		if (!is_Present && upperLimit === selectedFeatures.length) {
			return;
		}
		if (is_Present) {
			setSelectedFeatures((MRIFeatures: listItem[]) =>
				MRIFeatures.filter((feature: listItem) => feature.id !== id)
			);
		} else {
			setSelectedFeatures((MRIFeatures: listItem[]) => [
				...MRIFeatures,
				...featureData[dataType].features.filter(
					(feature: listItem) => feature.id === id
				),
			]);
		}
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	const isFeatureSelected = (id: string): boolean =>
		selectedFeatures.filter((feature: listItem) => feature.id === id)
			.length > 0;

	return (
		<ScrollView>
			<View style={styles.wrappingViewStyle}>
				<View style={styles.headingStyle}>
					<Text
						style={[textStyles.defaultTextStyle, textStyles.titleStyle]}
					>
						{dataType} Features
					</Text>
				</View>
				<View style={styles.headingStyle}>
					<Text
						style={[
							textStyles.defaultTextStyle,
							textStyles.subTitleStyle,
						]}
					>
						{selectedFeatures.length} out of {upperLimit} selected
					</Text>
				</View>
				<View style={styles.selectContainerStyle}>
					{featureData[dataType].features.map((feature) => (
						<Pressable
							key={feature.id}
							style={styles.selectOptionContainerStyle}
							onPress={() => handleSelectPress(feature.id)}
						>
							<View style={styles.selectIconContainerStyle}>
								<View style={styles.iconTouchAreaStyle}>
									<View
										style={
											isFeatureSelected(feature.id)
												? [
														styles.iconStyle,
														styles.selectedIconStyle,
												]
												: styles.iconStyle
										}
									>
										<View
											style={
												isFeatureSelected(feature.id)
													? [
															styles.innerSelectedIconStyle,
													]
													: []
											}
										/>
									</View>
								</View>
							</View>
							<View
								style={
									upperLimit === selectedFeatures.length &&
									!isFeatureSelected(feature.id)
										? [
												styles.selectTextAreaContainerStyle,
												styles.selectUnselectableTextAreaContainerStyle,
										]
										: styles.selectTextAreaContainerStyle
								}
							>
								<Text
									style={[textStyles.defaultTextStyle]}
									numberOfLines={1}
								>
									{feature.value}
								</Text>
								<Text style={[textStyles.defaultSubTextStyle]}>
									Score = {feature.score}
								</Text>
							</View>
						</Pressable>
					))}
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	wrappingViewStyle: {
		marginTop: 25,
	},
	headingStyle: {
		marginTop: 5,
		paddingLeft: 30,
	},
	selectContainerStyle: {
		margin: 30,
	},
	selectOptionContainerStyle: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: 1,
		...Platform.select({
			ios: {
				borderBottomColor: PlatformColor('separator'),
			},
			default: {
				borderBottomColor: 'black',
			},
		}),
	},
	selectIconContainerStyle: {
		paddingTop: 6.5,
		paddingBottom: 6.5,
		flex: 0.1,
		flexDirection: 'row',
	},
	iconTouchAreaStyle: {
		width : 25,
	},
	iconStyle: {
		flex: 1,
		borderRadius: 30,
		borderWidth: 1.2,
		...Platform.select({
			ios: {
				borderColor: PlatformColor('secondaryLabel'),
			},
			default: {
				borderColor: 'grey',
			},
		}),
	},
	selectedIconStyle: {
		borderWidth: 2,
		borderColor: iosLabelColor,
	},
	innerSelectedIconStyle: {
		borderRadius: 30,
		flex: 1,
		margin: 1,
		backgroundColor: iosLabelColor,
	},
	selectTextAreaContainerStyle: {
		paddingLeft: 10,
		flex: 0.9,
	},
	selectUnselectableTextAreaContainerStyle: {
		opacity: 0.5,
	},
});

export default Selector;
