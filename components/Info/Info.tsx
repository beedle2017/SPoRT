import React from 'react';
import { View, StyleSheet } from 'react-native';
import { aboutText, disclaimerText } from '../../util/constants';
import InfoBox from './InfoBox';

const Info: React.FC<{}> = () => (
	<View style={styles.textArea}>
		<InfoBox heading='About :' info={aboutText} />
		<InfoBox heading='Disclaimer :' info={disclaimerText} />
	</View>
);

const styles = StyleSheet.create({
	textArea: {
		margin: 10,
	},
});

export default Info;
