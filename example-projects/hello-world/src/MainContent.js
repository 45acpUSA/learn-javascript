import React, { Component } from 'react';

class MainContent extends Component {
  constructor(props){
    super(props)
    this.state = {

      // adding the current value of the form input to state
      topicInput: '',

      topics: [
        {
          name: "HTML"
        },
        {
          name: "CSS"
        },
        {
          name: "Client Side Javascript"
        },
        {
          name: "Server Side Javascript"
        },
        {
          name: "SQL"
        },

      ]
    }
  }

  handleTopicInputChange(event){
    this.setState({topicInput: event.target.value})
  }

  topicFormSubmit(event){
    const newTopics = this.state.topics.concat({name: this.state.topicInput})
    this.setState({topics: newTopics})
    this.setState({topicInput: ''})
    event.preventDefault()
  }

  removeTopicClick(event){
    const indexToRemove = event.target.dataset.index
    const topics = this.state.topics.slice(0)
    topics.splice(indexToRemove, 1)
    this.setState({topics: topics})
  }

  render() {
    return (
      <div className='main-content'>
        <p>Welcome to my Portfolio.  I've been busy, so there is a lot to see here.</p>
        <h4>We've covered</h4>
        <ul>
          {this.state.topics.map((topic, index)=>{
            return (
              <li key={topic.name}>
                {topic.name}
                <button
                  onClick={(event) => this.removeTopicClick(event)} 
                  data-index={index}
                >X</button>
              </li>
            )
          })}
        </ul>

        <form onSubmit={this.topicFormSubmit.bind(this)}>
          <form-control>
            <label>New Topic</label>
            <br />
            <input id='topic-input' 
              value={this.state.topicInput} 
              onChange={this.handleTopicInputChange.bind(this)} />
          </form-control>
          <input type='submit' value='Add Topic' />
        </form>

      </div>
    );
  }
}

export default MainContent;

