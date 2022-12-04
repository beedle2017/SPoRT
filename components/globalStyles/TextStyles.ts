import { StyleSheet, Platform, PlatformColor } from 'react-native';

export const textStyles = StyleSheet.create({
	defaultTextStyle: {
		fontSize: 17,
		...Platform.select({
			ios: {
				color: PlatformColor('label'),
			},
			default: {
				color: 'black',
			},
		}),
	},
	defaultSubTextStyle: {
		fontSize: 14,
		...Platform.select({
			ios: {
				color: PlatformColor('secondaryLabel'),
			},
			default: {
				color: 'grey',
			},
		}),
	},
	titleStyle: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	subTitleStyle: {
		fontSize: 18.5,
		...Platform.select({
			ios: {
				color: PlatformColor('secondaryLabel'),
			},
			default: {
				color: 'grey',
			},
		}),
	},
});

export const iosLabelColor: string = '#007AFF';
