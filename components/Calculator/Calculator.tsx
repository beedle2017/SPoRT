import 'react-native-gesture-handler';
import React, { useState } from 'react';
import SelectList from './SelectList';
import {
	View,
	StyleSheet,
} from 'react-native';
import { CalculatorProps } from '../../util/types';

const Calculator: React.FC<{ navigation: CalculatorProps['navigation'] }> = ({
	navigation,
}) => (
	<>
		<SelectList navigation={navigation} selectDataType={'MRI'} />
		<SelectList navigation={navigation} selectDataType={'USS'} />
		<SelectList navigation={navigation} selectDataType={'Clinical'} />
		<View style={styles.bottomBuffer} />
	</>
);

const styles = StyleSheet.create({
	bottomBuffer: {
		marginTop: 30,
	},
});

export default Calculator;
