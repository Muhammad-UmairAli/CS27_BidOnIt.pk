import React, { Component } from 'react';
  export default class CountDown extends Component {
    constructor(props) {
      super(props);
      var date = new Date();
      var timestamp = date.getTime();
      var newtimestamp = 0;
      var newtimestamp1 = (props.timer - timestamp);
      var newtimestamp2 = (props.timestamp - timestamp);
      if(newtimestamp1 > 0){
          //console.log('1');
          newtimestamp = newtimestamp1;
      }else if(newtimestamp2 > 0){
        //console.log('2');
          newtimestamp = newtimestamp2;
      }else{
        this.props.currentCountDown(this.props.productIndex, 0);
      }
      this.state = {
          timer : newtimestamp <= 0 ?  0 : newtimestamp,
          running : false,
      }
    }

    componentDidUpdate(prevProps, prevState) {
        if((this.state.running !== this.props.running) && (this.state.newData !== this.props.newData)){
            var newtimestamp = (this.props.timer);
            clearInterval(this.timer);
            this.setState({timer : newtimestamp});
            this.handleStart();
        }

        if(this.state.timer === 0){
            clearInterval(this.timer);
        }
    }

    componentWillMount() {
        this.handleStart();
    }

    timer

    handleStart() {
        const timer = setInterval(() => {
            if(this.state.timer > 0){
                let newCount = this.state.timer - 1000;
                newCount = newCount <= 0 ? 0 : newCount;
                this.props.currentCountDown(this.props.productIndex, newCount);
                this.setState(
                    {timer: newCount}
                );
            }else{
                this.props.currentCountDown(this.props.productIndex, 0);
            }
        }, 1000);
        this.timer = timer;
        this.setState({running : this.props.running});
        
    }

    format(millis) {
        if(millis > 0){
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }else{
            return '0:00';
        }
    }

    render () {
        const state = this.state;
        return (
            <div>
                <span>{this.format(state.timer)}</span>
            </div>
        )
    }

}