const limit = (number: number, places: number) =>
	Math.round(number * Math.pow(10, places)) / Math.pow(10, places);

export const getSportScore = (
	MRIFeatureScores: number[],
	USSFeatureScores: number[],
	ClinicalFeatureScores: number[]
): number =>
	[...MRIFeatureScores, ...USSFeatureScores, ...ClinicalFeatureScores].reduce(
		(a: number, b: number) => a + b,
		0
	);

export const getSurgeryProbability = (
	MRIFeatureScores: number[],
	USSFeatureScores: number[],
	ClinicalFeatureScores: number[]
): number =>
	limit(
		1 /
			(1 +
				Math.exp(
					0.6931 -
						4.4148 *
							getSportScore(
								MRIFeatureScores,
								USSFeatureScores,
								ClinicalFeatureScores
							)
				)),
		4
	);

export const getPrediction = (
	MRIFeatureScores: number[],
	USSFeatureScores: number[],
	ClinicalFeatureScores: number[]
): string =>
	getSurgeryProbability(
		MRIFeatureScores,
		USSFeatureScores,
		ClinicalFeatureScores
	) < 0.5
		? 'Physiotherapy'
		: 'Surgery';
