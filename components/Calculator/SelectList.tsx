import React, { useContext } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
	Platform,
	PlatformColor,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Context from '../../util/store';
import listItem, { CalculatorProps } from '../../util/types';
import { iosLabelColor, textStyles } from '../globalStyles/TextStyles';

const SelectList: React.FC<{
	navigation: CalculatorProps['navigation'];
	selectDataType: string;
}> = ({ navigation, selectDataType }) => {

	const selectedFeatures: listItem[] =
		useContext(Context)[selectDataType].selectedFeatures;

	const navigateToSelector = (): void => {
		navigation.navigate('Selector', {
			dataType: selectDataType,
		});
	};

	return (
		<>
			<View style={styles.wrappingViewStyle}>
				<Text
					style={[textStyles.defaultTextStyle, textStyles.titleStyle, styles.headerTextStyle]}
				>
					{selectDataType} Features
					{'\n'}
				</Text>
				<View style={[styles.listStyle]}>
					{selectedFeatures.map((dataItem, idx) => (
						<View
							style={
								idx === 0
									? [
											styles.listItemWrapperStyle,
											styles.topRoundedBorderStyle,
									  ]
									: [styles.listItemWrapperStyle]
							}
							key={idx}
						>
							<View
								style={[
									styles.listItemStyle,
									styles.separatorStyle,
								]}
							>
								<Text style={textStyles.defaultTextStyle}>
									{dataItem.value}
								</Text>
								<Text style={textStyles.defaultSubTextStyle}>
									Score = {dataItem.score}
								</Text>
							</View>
						</View>
					))}
					<TouchableHighlight
						style={styles.bottomRoundedBorderStyle}
						onPress={() => navigateToSelector()}
					>
						<View
							style={[
								styles.listItemWrapperStyle,
								styles.bottomRoundedBorderStyle,
							]}
						>
							<View
								style={[
									styles.listItemStyle,
									styles.addButtonStyle,
								]}
							>
								<Icon
									name='edit'
									size={25}
									color={iosLabelColor}
								/>
							</View>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	wrappingViewStyle: {
		marginTop: 30,
	},
	headerTextStyle: {
		alignSelf: 'center',
		width: '85%',
	},
	listStyle: {
		alignSelf: 'center',
		width: '85%',
	},
	listItemWrapperStyle: {
		paddingLeft: 30,
		...Platform.select({
			ios: {
				backgroundColor: PlatformColor('secondarySystemBackground'),
			},
			default: {
				backgroundColor: 'whitesmoke',
			},
		}),
	},
	listItemStyle: {
		paddingTop: 15,
		paddingBottom: 15,
		justifyContent: 'center',
	},
	separatorStyle: {
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
	addButtonStyle: {
		right: 30,
		alignItems: 'center',
	},
	bottomRoundedBorderStyle: {
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderBottomStartRadius: 10,
		borderBottomEndRadius: 10,
	},
	topRoundedBorderStyle: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderTopStartRadius: 10,
		borderTopEndRadius: 10,
	},
});

export default SelectList;
