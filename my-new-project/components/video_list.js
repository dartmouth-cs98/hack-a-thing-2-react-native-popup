import React, { Component } from 'react';
import Search from 'react-native-search-box';

import { ActivityIndicator, StyleSheet, View, Image, Text, FlatList, TouchableHighlight } from 'react-native';

import youtubeSearch from '../youtube-api';

class VideoList extends Component {
	static navigationOptions = {
		title: 'Youtube Search',
		headerStyle: {
			backgroundColor: '#f4511e',
		},
		headerTintColor: 'white',
	};

	constructor(props) {
		super(props);
		this.state = {
			query: 'true facts',
			isLoading: true,
			data: [],
		};

		// this.renderVideoCell = this.renderVideoCell.bind(this);
	}

	// // ---------- componentDidMount here! -----------//
	componentDidMount() {
		return this.fetchData();
	}

	// ------------ put fetchData here! -------------//
	fetchData() {
		youtubeSearch(this.state.query)
			.then(responseData => {
				console.log(responseData);
				this.setState({
					data: responseData,
					isLoading: false,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	showVideoDetail(video) {
		// pass in video into this.props.navigation.state.params.video in navigated view
		this.props.navigation.navigate('Detail', { video });
	}

	renderLoadingView() {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	// renderVideoCell(video) {
	// 	return (
	// 		<TouchableHighlight
	// 			onPress={() => {
	// 				this.showVideoDetail(video);
	// 			}}
	// 			underlayColor="orange"
	// 		>
	// 			<View>
	// 				<View style={styles.container}>
	// 					<Image source={{ uri: video.snippet.thumbnails.default.url }} style={styles.thumbnail} />
	// 					<View style={styles.rightContainer}>
	// 						<Text style={styles.title}>{video.snippet.title}</Text>
	// 						<Text style={styles.subtitle}>{video.snippet.description}</Text>
	// 					</View>
	// 				</View>
	// 				<View style={styles.separator} />
	// 			</View>
	// 		</TouchableHighlight>
	// 	);
	// }

	render() {
		if (this.state.isLoading) {
			return this.renderLoadingView();
		}
		return (
			<View>
				<Search
					backgroundColor="#c4302b"
					showsCancelButton={false}
					textFieldBackgroundColor="#c4302b"
					onChangeText={query => {
						this.setState({ query });
						this.fetchData();
					}}
				/>
				{/* <FlatList data={[{ key: 'a' }, { key: 'b' }]} renderItem={({ item }) => <Text>{item.key}</Text>} /> */}
				<FlatList
					data={this.state.data}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<TouchableHighlight
							onPress={() => {
								this.showVideoDetail(item);
							}}
							underlayColor="orange"
						>
							<View>
								<View style={styles.container}>
									<Image
										source={{ uri: item.snippet.thumbnails.default.url }}
										style={styles.thumbnail}
									/>
									<View style={styles.rightContainer}>
										<Text style={styles.title}>{item.snippet.title}</Text>
										<Text style={styles.subtitle}>{item.snippet.description}</Text>
									</View>
								</View>
								<View style={styles.separator} />
							</View>
						</TouchableHighlight>
					)}
					keyExtractor={item => item.title}
				/>
			</View>
		);
	}
}

export default VideoList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'rgb(240,240,240)',
	},
	thumbnail: {
		width: 100,
		height: 100,
		marginRight: 5,
		backgroundColor: 'black',
	},
	rightContainer: {
		flex: 1,
		padding: 5,
		height: 100,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 3,
	},
	subtitle: {
		fontSize: 12,
	},
	separator: {
		height: 1,
		backgroundColor: 'rgb(200,200,200)',
	},
	listView: {
		backgroundColor: 'rgb(240,240,240)',
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
