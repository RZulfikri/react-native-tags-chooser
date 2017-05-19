# react-native-tags-chooser
Simple selection item component, using dropdown and tags.

# Description
This is simple react native component (Android && IOS) for item shooser, and show output as tags. This component used for multi chooser item.

# View

| Before Chooser | When Choose | Output |
| ----- | ----- | ----- |
| ![output before selected](http://i.imgur.com/zr75uWE.png) | ![when selected](http://i.imgur.com/R1iHkTT.png) | ![after selected](http://i.imgur.com/D1fxgKq.png) |

# Installation
No npm installation at this time, so use :

`npm intall --save https://github.com/RZulfikri/react-native-tags-chooser.git`

# Usage

```
...
import {Select, Option} from 'react-native-tags-chooser'
...

export default class exsample extends Component {
  this.state = {
            tags : [{id : 1, name : "mantap"}, {id : 2, name : "joss"}, {id : 3, name : "hallo"}, {id : 4, name : "olahraga"}, {id : 5, name : "kuliner"}, {id : 6, name : "travelling"}, {id : 7, name : "jalan jalan"}]
  }
  
  // Handle after selct tags
  // value of data is array of selected tag. object like tags array.
  _onSelect(data) {
    console.log(data)
  }
  
  render(){
    let topic_options = null
    if(this.state.topics.length >= 1){
        topic_options = this.state.tags.map((row, index) => <Option key={index} value={row.id}>{row.name}</Option>)
    }
    return(
      <View style={styles.container}>
        <StatusBar hidden/>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
        <View>
          <Select
              onSelect={this._onSelectc.bind(this)}
              textStyle={{fontSize : 16, marginLeft : 8, marginRight : 8,}}
              backdropStyle={{ backgroundColor: '#fff' }}
              >
              {topic_options}
          </Select>          
        </View>
       </View>
    )
  }
}
```


### Props

### Props for Select

| Prop Name         | Data Type | Default Values  | Description                                      |
|-----------------  |-----------|-----------------|--------------------------------------------------|
| style             | object    | null            | To style the select box.                         |
| defaultText       | string    | Click To Select | Text to show as default text                     |
| onSelect          | function  | null            | function that executes on selection of an option |
| textStyle         | object    | null            | To style the text shown in the box               |
| backdropStyle     | object    | background white     | To style the modal background |
| tagsStyle         | object    | it have default style | To style outputs tags like color tags, border, etc except text     |
| tagTextStyle      | object    | it have default style | To style text in tags output                      |
| modalSelectedColor| string    | it have default style | To set color of selected item           |
| modalItemStyle    | string    | it have default style | To style items in modal     |
| modalTitle        | string    | "Select Tags"         | To set modal title                 |
| modalHeaderStyle  | object    | it have default style | To style modal header style                     |


### Props for Option


| Prop Name | Data Type | Default Values | Description                           |
|-----------|-----------|----------------|---------------------------------------|
| style     | object    | null           | To style each option                  |
| styleText | object    | null           | To style the text shown in the option |


# Thanks to

Thanks to : <a href="https://github.com/gs-akhan">Azharuddin (gs-akhan)</a>. This component modify from <a href="https://github.com/gs-akhan/react-native-chooser">React Native Chooser</a>
