import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import '../css/react-rte-custom.css';
// See more on https://www.npmjs.com/package/react-rte

class MyStatefulEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    //console.log(value.toString('markdown'))
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
    this.props.updateFormState({ editorString: value.toString('markdown') })
  };

  render () {
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['HISTORY_BUTTONS']
    };
    return (
      <RichTextEditor
        toolbarConfig={toolbarConfig}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

export default MyStatefulEditor;
