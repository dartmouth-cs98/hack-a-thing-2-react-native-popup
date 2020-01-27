import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import About from '../components/about';
import SearchTab from './search_tab';
import { View, Text } from 'react-native';

const AboutTab = props => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Text>about</Text>
		</View>
	);
};

// const SearchTab = props => {
// 	return (
// 		<View style={{ flex: 1, justifyContent: 'center' }}>
// 			<Text>Search</Text>
// 		</View>
// 	);
// };

const MainTabBar = createBottomTabNavigator(
	{
		SearchTab,
		AboutTab: {
			screen: About,
			navigationOptions: ({ navigation }) => ({
				tabBarLabel: 'About',
				tabBarIcon: ({ focused }) => (
					<Ionicons name="info-circle" size={26} color={focused ? '#58AADA' : 'grey'} />
				),
			}),
		},
	},
	{
		initialRouteName: 'SearchTab',
	}
);

export default createAppContainer(MainTabBar);
