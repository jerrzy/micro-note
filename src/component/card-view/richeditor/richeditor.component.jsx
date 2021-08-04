import React from "react";

import MUIEditor, {
  MUIEditorState,
  toolbarControlTypes,
  toHTML,
} from "react-mui-draft-wysiwyg";

import { convertFromHTML, ContentState } from "draft-js";

const config = {
  editor: {
    style: {
      margin: "10px",
      padding: "10px",
      height: "300px",
      overflow: "auto",
    },
  },
  toolbar: {
    style: {
      margin: "10px",
    },
    controls: [
      toolbarControlTypes.bold,
      toolbarControlTypes.italic,
      toolbarControlTypes.underline,
      toolbarControlTypes.fontColor,
      toolbarControlTypes.fontBackgroundColor,
      toolbarControlTypes.fontSize,
      toolbarControlTypes.fontFamily,
    ],
  },
};

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
    };
  }

  handleEditorChange = (newState) => {
    this.setState({
      editorState: newState,
    });

    const content = newState.getCurrentContent();
    const contentHTML = toHTML(content);
    this.props.onChange(contentHTML);
    // console.log("editor tiggered update");
  };

  getEditorState = () => {
    if (this.state.editorState) {
      return this.state.editorState;
    }
    if (this.props.contentHTML) {
      const blocksFromHTML = convertFromHTML(this.props.contentHTML);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const editorInitialState = MUIEditorState.createWithContent(
        config,
        state
      );
      return editorInitialState;
    } else {
      return MUIEditorState.createEmpty();
    }
  };

  render() {
    return (
      <MUIEditor
        className="m-2"
        editorState={this.getEditorState()}
        onChange={this.handleEditorChange}
        config={config}
      />
    );
  }
}

export default RichEditor;
