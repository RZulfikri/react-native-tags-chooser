import React, { Component } from "react";
import ReactNative from "react-native";

var {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback
} = ReactNative;

class Option extends Component {
  render() {
    const { style, styleText } = this.props;

    return (
      <View style={[style]}>
        <Text style={[styles.optionText, styleText]}>
          {" "}
          {this.props.children}{" "}
        </Text>
      </View>
    );
  }
}

Option.propTypes = {
  style: View.propTypes.style,
  styleText: Text.propTypes.style,
  children: React.PropTypes.string.isRequired
};

var styles = StyleSheet.create({
  optionText: {
    fontSize: 14
  }
});
export default Option;
