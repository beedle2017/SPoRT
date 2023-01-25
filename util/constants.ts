import listItem, { constantInfo } from './types';

const allMRIFeatures: listItem[] = [
	{
		id: '0',
		value: 'Adductor Tendinopathy/injury',
		score: -2,
	},
	{
		id: '1',
		value: 'Rectus Origin Injury',
		score: -2,
	},
	{
		id: '2',
		value: 'Rectus Abductor Aponeurotic Tear',
		score: -2,
	},
	{
		id: '3',
		value: 'PLAC Abnormality',
		score: -2,
	},
	{
		id: '4',
		value: 'Labral Tear',
		score: -2,
	},
	{
		id: '5',
		value: 'Osteitis Pubis',
		score: -1,
	},
	{
		id: '6',
		value: 'Bone Oedema',
		score: -1,
	},
	{
		id: '7',
		value: 'FAI',
		score: -1,
	},
];

const allUSSFeatures: listItem[] = [
	{
		id: '0',
		value: 'Hernia',
		score: 2,
	},
	{
		id: '1',
		value: 'Femoral Hernia',
		score: 2,
	},
	{
		id: '2',
		value: 'Lipoma of Cord',
		score: 2,
	},
	{
		id: '3',
		value: 'Posterior Wall Weakness',
		score: 2,
	},
	{
		id: '4',
		value: 'Pain on Pubic Bone',
		score: 1,
	},
];

const allClinicalFeatures: listItem[] = [
	{
		id: '0',
		value: 'Groin Defect of External Ring',
		score: 2,
	},
	{
		id: '1',
		value: 'Groin Hernia',
		score: 1,
	},
	{
		id: '2',
		value: 'Pain on Twisting or Turning',
		score: 1,
	},
	{
		id: '3',
		value: 'Pain on Running',
		score: 1,
	},
	{
		id: '4',
		value: 'Pain on Coughing or Sneezing',
		score: 1,
	},
	{
		id: '5',
		value: 'Pain on Sit Ups',
		score: 1,
	},
	{
		id: '6',
		value: 'Pubic Bone Pain',
		score: -1,
	},
];

const featureData: constantInfo = {
	MRI: {
		features: allMRIFeatures,
		upperLimit: 4,
	},
	USS: {
		features: allUSSFeatures,
		upperLimit: 4,
	},
	Clinical: {
		features: allClinicalFeatures,
		upperLimit: 4,
	},
};

export default featureData;

export const aboutText: string = `
Sheen Paajanen groin Recommended Treatment 'SPoRT' score for groin pain - this score was developed to help determine whether conservative measures or surgery is required for the management of groin pain attributable to inguinal disruption. The scoring system was developed by Professor Aali Sheen and Dr. Hannu Paajanen in an international collaborative effort.

The SPoRT score has demonstrated excellent performance with an accuracy of 89.54%, sensitivity of 90.9%, specificity of 89.2% and an AUROC of 0.9356.

This score functions only as advice. It is recommended to look at the patient in terms of clinical symptoms and findings.

\u2022 if SPoRT score < 0 : We advise that physiotherapy and conservative measures would be the first treatment option over surgical intervention for the inguinal canal.

\u2022 if SPoRT score > 1 : We would suggest that surgery for the inguinal canal to reinforce it by any technique is a possible treatment choice.
`

export const disclaimerText: string =`
This is only an internally validated scoring system. Use in clinical setting is not recommended.
`