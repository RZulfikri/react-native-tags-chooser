import React, { Component } from "react";
import ReactNative from "react-native";
import OptionList from "./optionlist";
import update from "react-addons-update";

var {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Image
} = ReactNative;

const window = Dimensions.get("window");

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      defaultText: this.props.defaultText,
      selectedItems: [],
      tempSelectedItems: []
    };
  }

  onSelect(data) {
    // 		console.log("Press select")
    // 		console.log(data)
    this.setState({
      ...this.state,
      tempSelectedItems: data
    });
  }

  _onRemoveItem = data => {
    const index = this.state.selectedItems.findIndex(item => {
      return item.id === data.id;
    });
    const items = update(this.state.selectedItems, { $splice: [[index, 1]] });
    this.props.onSelect(items);
    this.setState({
      selectedItems: items
    });
  };

  _onPressDone = () => {
    // 		console.log("press done")
    const items = this.state.tempSelectedItems;
    this.props.onSelect(items);
    this.setState({
      ...this.state,
      selectedItems: items,
      modalVisible: false
    });
  };

  render() {
    let {
      style,
      defaultText,
      textStyle,
      backdropStyle,
      tagsStyle,
      tagTextStyle,
      modalTitle,
      modalHeaderStyle,
      animationType,
      transparent,
      selectBoxStyle,
      modalSelectedColor,
      modalItemStyle
    } = this.props;

    return (
      <View style={[styles.selectBox, style]}>
        <TouchableWithoutFeedback
          onPress={
            this.state.selectedItems.length > 0 ? null : this.onPress.bind(this)
          }
        >
          <View>
            {this.state.selectedItems.length > 0 ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {this.state.selectedItems.map((items, index) => (
                  <TouchableWithoutFeedback>
                    <View
                      style={[
                        {
                          margin: 2.5,
                          height: 25,
                          paddingLeft: 8,
                          paddingRight: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgb(68,125,189)",
                          borderRadius: 5,
                          flexDirection: "row"
                        },
                        tagsStyle
                      ]}
                    >
                      <Text
                        key={index}
                        style={[
                          { color: "#fff", paddingRight: 10 },
                          tagTextStyle
                        ]}
                      >
                        {items.name}
                      </Text>
                      <TouchableWithoutFeedback
                        onPress={() => this._onRemoveItem(items)}
                      >
                        <Image
                          source={require("../icons/close.png")}
                          style={{ width: 10, height: 10 }}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
                <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
                  <View
                    style={{
                      margin: 2.5,
                      height: 25,
                      paddingLeft: 8,
                      paddingRight: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#BDC3C7",
                      borderRadius: 5,
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      source={require("../icons/close.png")}
                      style={{
                        width: 10,
                        height: 10,
                        transform: [{ rotate: "45deg" }]
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <View style={styles.selectBoxContent}>
                <Text style={textStyle}>{this.state.defaultText}</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        <Modal
          transparent={transparent}
          animationType={animationType}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={[styles.modalOverlay, backdropStyle]}>
            <View
              style={[
                {
                  flexDirection: "row",
                  height: 75,
                  borderBottomColor: "rgb(230,230,230)",
                  borderBottomWidth: 1,
                  backgroundColor: "rgb(73,149,206)",
                  alignItems: "center"
                },
                modalHeaderStyle
              ]}
            >
              <TouchableWithoutFeedback onPress={this.onModalPress.bind(this)}>
                <Image
                  source={require("../icons/close.png")}
                  style={{ width: 15, height: 15, margin: 16 }}
                />
              </TouchableWithoutFeedback>
              <Text style={{ color: "#fff", fontSize: 18 }}>{modalTitle}</Text>
              <TouchableWithoutFeedback onPress={this._onPressDone}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    margin: 16
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>Done</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <OptionList
              onSelect={this.onSelect.bind(this)}
              selectedItems={this.state.selectedItems}
              selectedColor={{ backgroundColor: modalSelectedColor }}
              modalItemStyle={modalItemStyle}
              style={[selectBoxStyle]}
            >
              {this.props.children}
            </OptionList>
          </View>
        </Modal>
      </View>
    );
  }

  onPress() {
    this.setState({
      ...this.state,
      modalVisible: !this.state.modalVisible
    });
  }

  onModalPress() {
    this.setState({
      ...this.state,
      modalVisible: false
    });
  }
}

var styles = StyleSheet.create({
  selectBox: {
    borderWidth: 1,
    width: Dimensions.get("window").width
  },
  selectBoxContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 30
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    width: window.width,
    height: window.height
  }
});

Select.propTypes = {
  style: View.propTypes.style,
  defaultText: React.PropTypes.string,
  onSelect: React.PropTypes.func,
  textStyle: Text.propTypes.style,
  backdropStyle: View.propTypes.style,
  tagsStyle: View.propTypes.style,
  tagTextStyle: View.propTypes.style,
  modalSelectedColor: React.PropTypes.string,
  modalItemStyle: View.propTypes.style,
  modalTitle: React.PropTypes.string,
  modalHeaderStyle: View.propTypes.style
};

Select.defaultProps = {
  defaultText: "Click To Select Tags",
  onSelect: () => {},
  transparent: true,
  animationType: "none",
  backdropStyle: { background: "rgba(0,0,0,1.0)" },
  modalSelectedColor: "rgb(237,242,250)",
  modalTitle: "Select Tags"
};
export default Select;
