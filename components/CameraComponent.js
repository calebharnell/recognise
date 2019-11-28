import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera } from 'expo-camera';
import { CLARIFAI_API_KEY } from 'react-native-dotenv';
import CaptureButton from './CaptureButton'

export default class CameraComponent extends React.Component {
	constructor(props) {
		super(props);
    this.state = { 
      identifedAs: '',
      loading: false,
    }
  }
	async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  takePicture = async function(){
		
		if (this.camera) {

			// Pause the camera's preview
			this.camera.pausePreview();
            
            // Set the activity indicator
			this.setState((previousState, props) => ({
				loading: true
			}));
			
			// Set options
			const options = {
				base64: true
			};
			
			// Get the base64 version of the image
			const data = await this.camera.takePictureAsync(options)

			const manipResult = await ImageManipulator.manipulateAsync(
				data.uri,
				[{ resize: { width: 384, height: 512 } }],
        { base64: true },
			);
			// Get the identified image
			this.identifyImage(manipResult.base64);
		}
	}

	identifyImage(imageData){

		// Initialise Clarifai api
		const Clarifai = require('clarifai');

		const app = new Clarifai.App({
			apiKey: CLARIFAI_API_KEY,
		});

		// Identify the image
		app.models.predict(Clarifai.FOOD_MODEL, {base64: imageData})
			.then((response) => {
				this.displayAnswer(`${response.outputs[0].data.concepts[0].name}`)
			})
			.catch((err) => alert(err))
	}

	displayAnswer(identifiedImage){

		// Dismiss the acitivty indicator
		this.setState((prevState, props) => ({
			identifedAs:identifiedImage,
			loading:false
		}));

		// Show an alert with the answer on
		Alert.alert(
			this.state.identifedAs,
			'',
			{ cancelable: false }
		  )

		// Resume the preview
		this.camera.resumePreview();
	}
    
	render() {
		return (
      <Camera ref={(ref) => this.camera = ref} style={styles.preview}>
        <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading} />
        <CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)} />
      </Camera>
		);
	}
}

const styles = StyleSheet.create({
    preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	loadingIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});