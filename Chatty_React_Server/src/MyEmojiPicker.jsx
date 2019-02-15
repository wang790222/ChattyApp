import React from 'react';
import EmojiPicker from 'emoji-picker-react';

export default class MyEmojiPicker extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EmojiPicker emojiShown="false" onEmojiClick={this.props.handleEmoji} />
    );
  }
}
