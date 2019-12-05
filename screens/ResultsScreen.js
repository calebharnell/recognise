import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

class ResultsScreen extends React.PureComponent {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Results:</Text>
        {
          this.props.results.current.map((result) => (
            <Text key={result.id}>{result.name.toUpperCase()} - {parseInt((result.value) * 100)}%</Text>
          ))
        }
      </ScrollView>
    );
  }
}

ResultsScreen.navigationOptions = {
  title: 'Results',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  const { results } = state
  return { results }
};

export default connect(mapStateToProps)(ResultsScreen);
