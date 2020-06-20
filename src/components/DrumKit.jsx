import React from "react";

import DrumPad from "./DrumPad";
import Display from "./Display";
import Switch from "./Switch";

import { bankOne, bankTwo } from "../constants/keynotes";

import "../stylesheets/components/DrumKit.scss";

const pads = "QWEASDZXC".split("");

class DrumKit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPowerOn: false,
      isBanked: false,
      padPressed: {},
    };
    pads.map((padKey) => this[`drumPad_${padKey}`] = React.createRef());
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onPadClick = this.onPadClick.bind(this);
    this.onToggleBank = this.onToggleBank.bind(this);
    this.onTogglePower = this.onTogglePower.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("keyup", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keyup", this.handleKeyPress);
  }

  handleKeyPress(event) {
    const { isBanked, isPowerOn } = this.state;
    if(isPowerOn) {
      const padKeys = isBanked ? bankOne : bankTwo;
      const padPressed = padKeys.find((obj) => obj.keyCode === event.keyCode);
      padPressed && this.onPadClick(padPressed);
    }
  }

  onPadClick(pad) {
    this.setState({
      padPressed: pad,
    });
    this[`drumPad_${pad.keyTrigger}`].play();
  }

  onTogglePower({ target: { checked = false } }) {
    const { padPressed } = this.state;
    this.setState({
      isPowerOn: checked,
      padPressed: !checked ? {} : padPressed,
    });
  }

  onToggleBank(event) {
    this.setState({ isBanked: event.target.checked });
  }

  render() {
    const { isBanked, isPowerOn, padPressed } = this.state;
    const padKeys = isBanked ? bankOne : bankTwo;
    return (
      <div className="drum-kit" id="drum-machine">
        <div className="row">
          <div className="col-md-6 drum-pad-container">
            {padKeys.map((obj) => (
              <DrumPad
                key={obj.id}
                pad={obj}
                onClick={(e) => isPowerOn ? this.onPadClick(obj) : null}
                padRef={(input) => this[`drumPad_${obj.keyTrigger}`] = input}
              />
            ))}
          </div>
          <div className="col-md-6 right-container">
            <Switch
              title="Power"
              fieldName="power"
              enabled={isPowerOn}
              onChange={this.onTogglePower}
            />
            <Display text={padPressed.id} />
            <Switch
              title="Bank"
              fieldName="bank"
              enabled={isBanked}
              onChange={this.onToggleBank}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DrumKit;
