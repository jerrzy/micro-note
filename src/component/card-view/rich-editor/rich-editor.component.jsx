import React from "react";

import { ContentState, EditorState, convertToRaw } from "draft-js";

import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./rich-editor.css";
import EditorProperties from "./rich-editor.properties";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.contentHTML
        ? EditorState.createWithContent(
            ContentState.createFromBlockArray(
              htmlToDraft(props.contentHTML).contentBlocks
            )
          )
        : EditorState.createEmpty(),
    };
  }

  handleEditorChange = (newState) => {
    this.setState({
      editorState: newState,
    });

    const content = newState.getCurrentContent();
    const rawContent = convertToRaw(content);
    const html = draftToHtml(rawContent);
    this.props.onChange(html);
    console.log("editor tiggered update", html);
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        wrapperClassName="m-2"
        editorClassName="border"
        toolbar={EditorProperties}
        editorState={editorState}
        onEditorStateChange={this.handleEditorChange}
      />
    );
  }
}

export default RichEditor;
