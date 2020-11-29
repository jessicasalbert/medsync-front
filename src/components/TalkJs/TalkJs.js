import Talk from "talkjs";
import { connect } from 'react-redux'
import React, {Component, ReactDOM} from 'react'

class InboxApp extends React.Component {
    constructor(props) {
      super(props)
      this.talkjsContainer = React.createRef();
    }
  
    componentDidMount() {    
      Talk.ready.then(() => {
        var me = new Talk.User({
          id: this.props.patient.user.id,
          name: this.props.patient.user.name,
          email: this.props.patient.user.email,
          //photoUrl: this.props.patient.user.image,
          welcomeMessage: "Hey there! How are you? :-)",
          //role: "booker"
        });
        
        window.talkSession = new Talk.Session({
          appId: process.env.REACT_APP_APP_ID,
          me: me
        });
        
        var other = new Talk.User({
          id: this.props.patient_details.doctor.id,
          name: this.props.patient_details.doctor.name,
          email: this.props.patient_details.doctor.email,
          //photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
          welcomeMessage: "Hey, how can I help?",
          //role: "booker"
        });
  
        var conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
        conversation.setParticipant(me);
        conversation.setParticipant(other);
        
        var inbox = window.talkSession.createInbox({selected: conversation});
        inbox.mount(this.talkjsContainer.current);
      });
    }
  
    render() {
      return (
        <div ref={this.talkjsContainer} className="chatbox-container"></div>
      )
    }
  }


 const msp = (state) => {
    return {patient: state.patient, patient_details: state.patient_details}
}

 export default connect(msp)(InboxApp)



//  import Talk from "talkjs";
// import { connect } from 'react-redux'
// import React, {Component, ReactDOM} from 'react'

// class InboxApp extends React.Component {
//     constructor(props) {
//       super(props)
//       this.talkjsContainer = React.createRef();
//     }
  
//     componentDidMount() {    
//       Talk.ready.then(() => {
//         var me = new Talk.User({
//           id: this.props.patient.user.id,
//           name: this.props.patient.user.name,
//           email: this.props.patient.user.email,
//           photoUrl: this.props.patient.user.image,
//           welcomeMessage: "Hey there! How are you? :-)",
//           role: "booker"
//         });
        
//         window.talkSession = new Talk.Session({
//           appId: process.env.REACT_APP_APP_ID,
//           me: me
//         });
        
//         var other = new Talk.User({
//           id: this.props.patient.patient_details.doctor.id,
//           name: this.props.patient.patient_details.doctor.name,
//           email: this.props.patient.patient_details.email,
//           //photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
//           welcomeMessage: "Hey, how can I help?",
//           role: "booker"
//         });
  
//         var conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
//         conversation.setParticipant(me);
//         conversation.setParticipant(other);
        
//         var inbox = window.talkSession.createInbox({selected: conversation});
//         inbox.mount(this.talkjsContainer.current);
//       });
//     }
  
//     render() {
//       return (
//         <div ref={this.talkjsContainer} className="chatbox-container"></div>
//       )
//     }
//   }


//  const msp = (state) => {
//     return {patient: state.patient, patient_details: state.patient_details}
// }

//  export default connect(msp)(InboxApp)