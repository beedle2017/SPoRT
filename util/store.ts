import React from 'react';
import listItem, { contextType } from './types';

const Context = React.createContext<contextType>({
	MRI: {
		selectedFeatures: [],
		setSelectedFeatures: () => undefined,
	},
	USS: {
		selectedFeatures: [],
		setSelectedFeatures: () => undefined,
	},
	Clinical: {
		selectedFeatures: [],
		setSelectedFeatures: () => undefined,
	},
});

export default Context;
