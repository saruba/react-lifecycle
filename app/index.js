import React from 'react';
import { render } from 'react-dom';

const LifeCycleParentComponent = React.createClass({
    getDefaultProps() {
        console.log('Parent - getDefaultProps');
    },
    getInitialState() {
        console.log('Parent - getInitialState');
        return { text: "" }
    },
    componentWillMount() {
        console.log('Parent - componentWillMount')
    },
    render() {
        console.log('Parent - render');
        return (
            <div className="container">
                <div className="jumbotron form-group">
                    <input
                        className="form-control"
                        value={this.state.text}
                        onChange={this.onInputChange} />
                </div>
                <LifeCycleChildComponent inicial="pepito" text={this.state.text} />
            </div>
        );
    },
    componetDidMount() {
        console.log('Parent - componentDidMount');
    },
    componentWillUnmount() {
        console.log('Parent - componentWillUnmount');
    },
    onInputChange(e) {
        this.setState({text: e.target.value});
    }
});

let childEvents = [];
const LifeCycleChildComponent = React.createClass({
    propTypes: {
        text: React.PropTypes.string
    },
    getDefaultProps(){
        let event = 'Child - getDefaultProps';
        console.log(event);
        childEvents.unshift(event);
        return {
            'label': 'default label',
            'text': 'default label'
        }
    },
    getInitialState(){
        let event = 'Child - getInitialState';
        console.log(event);
        childEvents.unshift(event);
        return {};
    },
    componentWillMount(){
        let event = 'Child - componentWillMount';
        console.log(event);
        childEvents.unshift(event);
    },
    render(){
        let event = 'Child - render';
        console.log(event);
        childEvents.unshift(event);
        return (
            <div className="row">
                <div>Text Props: {this.props.text}</div>
                <div>Label Props: {this.props.label}</div>
                <h2>Child events</h2>
                <ul className="list-group">
                    {childEvents.map((event, index)=>(<li className="list-group-item" key={index}>{event}</li>))}
                </ul>
            </div>
        )
    },
    componentDidMount(){
        let event = 'Child - componentDidMount';
        console.log(event);
        childEvents.unshift(event);
    },
    componentWillUnmount(){
        let event = 'Child - componentWillUnmount'
        console.log(event);
        childEvents.unshift(event);
    },
    componentWillReceiveProps(nextProps){
        let event = 'Child - componentWillReceiveProps';
        console.log(event, nextProps);
        childEvents.unshift(`${event} nextState: ${nextProps.text}`);
        return true;
    },
    componentWillUpdate(nextProps, nextState){
        let event = 'Child - componentWillUpdate';
        console.log(event);
        console.log('nextProps: ', nextProps);
        console.log('nextState: ', nextState);
        childEvents.unshift(`${event} nextState: ${nextProps.text}, nextState: ${nextState.text}`);
    },
    componentDidUpdate(previousProps, previousState){
        let event = 'Child - componentDidUpdate';
        console.log(event);
        console.log('previousProps: ', previousProps);
        console.log('previousState: ', previousState);
        childEvents.unshift(`${event} previousProps: ${previousProps.text}, previousState: ${previousState.text}`);
    }
});

render(<LifeCycleParentComponent />, document.getElementById('app'));
