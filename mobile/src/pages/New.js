import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import api from '../services/api';
export default class New extends Component {
  static navigationOptions = {
    headerTitle: 'New post',
  };

  state = {
    preview: null,
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  };

  handleSelectImage = () => {
    launchImageLibrary({}, upload => {
      if (upload.error) {
        console.log('Error');
      } else if (upload.didCancel) {
        console.log('User canceled');
      } else {
        const imageUploaded = upload.assets[0];
        let prefix, ext;
        if (imageUploaded.fileName) {
          [prefix, ext] = imageUploaded.fileName.split('.');
          ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
        } else {
          prefix = new Date().getTime();
          ext = 'jpg';
        }
        upload.assets.forEach(item => console.log(item.uri));
        const image = {
          uri: imageUploaded.uri,
          type: imageUploaded.type,
          name: `${prefix}.${ext}`,
        };
        this.setState({preview: imageUploaded, image});
      }
    });
  };

  handleSubmit = async () => {
    const {image, author, place, description, hashtags} = this.state;
    const data = new FormData();
    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);
    console.log(image);
    // await api.post('/posts', data);
    // this.props.navigation.navigate('Feed');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={this.handleSelectImage}>
          <Text style={styles.selectButtonText}>Select image</Text>
        </TouchableOpacity>
        {this.state.preview && (
          <Image style={styles.preview} source={this.state.preview} />
        )}
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Author name"
          placeholderTextColor="#999"
          value={this.state.author}
          onChangeText={author => this.setState({author})}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Localization"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({place})}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Description"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({description})}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Hashtags"
          placeholderTextColor="#999"
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({hashtags})}
        />
        <TouchableOpacity
          style={styles.shareButton}
          onPress={this.handleSubmit}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});
