import React, { Component } from "react";
import ReactNative from "react-native";
import update from "react-addons-update";
var { StyleSheet, ScrollView, View, TouchableWithoutFeedback } = ReactNative;

class OptionList extends Component {
  state = {
    selectedItems: this.props.selectedItems
  };

  // handle on select
  _onSelect(data) {
    if (
      typeof this.state.selectedItems.find(item => {
        return item.id === data.id;
      }) === "undefined"
    ) {
      const items = update(this.state.selectedItems, { $push: [data] });
      this.props.onSelect(items);
      this.setState({
        selectedItems: items
      });
    } else {
      const index = this.state.selectedItems.findIndex(item => {
        return item.id === data.id;
      });
      const items = update(this.state.selectedItems, { $splice: [[index, 1]] });
      this.props.onSelect(items);
      this.setState({
        selectedItems: items
      });
    }
  }

  render() {
    // console.log(this.state.selectedItems)
    const {
      style,
      children,
      onSelect,
      selectedColor,
      modalItemStyle
    } = this.props;
    const renderedItems = React.Children.map(children, item => {
      return (
        <TouchableWithoutFeedback
          onPress={() =>
            this._onSelect({ name: item.props.children, id: item.props.value })}
        >
          <View
            style={[
              styles.item,
              modalItemStyle,
              this.state.selectedItems.findIndex(row => {
                return row.id === item.props.value;
              }) >= 0
                ? selectedColor
                : {}
            ]}
          >
            {item}
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <View style={[styles.scrollView, style]}>
        <ScrollView automaticallyAdjustContentInsets={false} bounces={false}>
          {renderedItems}
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  item: {
    padding: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(230,230,230)",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2.5,
    marginBottom: 2.5,
    backgroundColor: "#fff"
  }
});

OptionList.propTypes = {
  style: View.propTypes.style,
  onSelect: React.PropTypes.func,
  selectedColor: View.propTypes.style,
  modalItemStyle: View.propTypes.style
};

OptionList.defaultProps = {
  onSelect: () => {}
};

export default OptionList;
