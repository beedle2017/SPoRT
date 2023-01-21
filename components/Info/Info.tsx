import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { aboutText, disclaimerText } from '../../util/constants';
import InfoBox from './InfoBox';

const Info: React.FC<{}> = () => (
	<ScrollView>
		<View style={styles.textArea}>
			<InfoBox heading='About :' info={aboutText} />
			<InfoBox heading='Disclaimer :' info={disclaimerText} />
		</View>
	</ScrollView>
);

const styles = StyleSheet.create({
	textArea: {
		margin: 10,
	},
});

export default Info;
