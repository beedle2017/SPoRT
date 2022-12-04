import React from "react";
import { View, StyleSheet, Text, Platform, PlatformColor } from "react-native";
import { textStyles } from "../globalStyles/TextStyles";

const InfoBox: React.FC<{heading : string, info : string}> = ({heading, info}) => (
    <View style={styles.viewStyle}>
        <Text style={[textStyles.defaultTextStyle, styles.customTextStyle, {fontSize : 30}]}>
            {heading}
        </Text>
        <View style={styles.separator}/> 
        <Text style={[textStyles.defaultTextStyle, styles.customTextStyle]}>
            {info}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    viewStyle : {
        margin : 5,
        padding : 10,
        borderWidth : 3,
        borderRadius : 10,
        ...Platform.select({
            ios : {
                borderColor : PlatformColor('separator')
            },
            default : {
                borderColor : 'black'
            }
        })
    },
	customTextStyle: {
		fontSize: 20,
	},
    separator : {
        marginTop: 3,
        height : 3,
        width : '75%',
        borderWidth : 1,
        ...Platform.select({
			ios: {
				borderColor: PlatformColor('separator'),
			},
			default: {
				borderColor: 'grey',
			},
		}),
    }
});

export default InfoBox;