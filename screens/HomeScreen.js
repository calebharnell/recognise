import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CameraComponent from '../components/CameraComponent';

export default class HomeScreen extends React.Component {
  constructor(props){
		super(props);
		process.nextTick = setImmediate;
	}
	render() {
		return (
			<View style={styles.container}>
				<CameraComponent navigation={this.props.navigation} />
		 	</View>
		);
	}
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',	
	}
});
