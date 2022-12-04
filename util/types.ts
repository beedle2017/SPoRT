import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

export default interface listItem {
	id: string;
	value: string;
	score: number;
}

export interface constantInfo {
	[key: string]: {
		features: listItem[];
		upperLimit: number;
	};
}

export interface contextType {
	[key: string]: {
		selectedFeatures: listItem[];
		setSelectedFeatures: React.Dispatch<React.SetStateAction<listItem[]>>;
	};
}

export type RootStackParamList = {
	Calculator: undefined;
	Info: undefined;
	Selector: {
		dataType: string;
	};
};

export type CalculatorProps = NativeStackScreenProps<
	RootStackParamList,
	'Calculator'
>;
export type InfoProps = NativeStackScreenProps<RootStackParamList, 'Info'>;
export type SelectorProps = NativeStackScreenProps<
	RootStackParamList,
	'Selector'
>;
