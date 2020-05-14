export default [
  {
    code: 'userRole',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "I'm Hygeia, your healthcare assistant ."}, 
          { type: 'message', text: "Let's Get Started." },
          { type: 'message', text: "Are you a Client or a Provider?" },
          {
            type: 'button-option',
            inputKey: 'userRole',
            inputOptions: [
              { value: 'client', label: 'Client', actionInSentence: 'Im a Client.' },
              { value: 'provider', label: 'Provider', actionInSentence: 'Im a Provider.' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'visitFor',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: 'Who is this visit for?' },
          {
            type: 'button-option',
            inputKey: 'visitFor',
            inputOptions: [
              { value: 'me', label: 'Me', actionInSentence: 'For me.' },
              { value: 'child', label: 'My Child (18 and younger)', actionInSentence: 'For my child.' },
              { value: 'someoneElse', label: 'Someone else', actionInSentence: 'For someone else.' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'patientName',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Now, I'd like to know a bit more of you."}, 
          {
            type: 'input-type-message',
            inputType: 'textField',
            inputKey: 'patientName',
            message: "What's your name?"
          }
        ]
      }
    ]
  },
  {
    code: 'gender',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          {
            type: 'button-option',
            inputKey: 'gender',
            message: "Hi {patientName}! Are you a male or female?",
            inputOptions: [
              { value: 'male', label: 'Male', actionInSentence: 'Male' },
              { value: 'female', label: 'Female', actionInSentence: 'Female' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'birthYear',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          {
            type: 'input-type-message',
            inputType: 'textField',
            inputKey: 'birthYear',
            message: "What year were you born?"
          }
        ]
      }
    ]
  },
  {
    code: 'didProvideSymptoms',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Great, I have identified medical information for 625,123 people of your age and sex. "}, 
          { type: 'message', text: "I'll be able to compare your symptoms to theirs."}, 
          {
            type: 'button-option',
            inputKey: 'didProvideSymptoms',
            message: "Would you like to provide more information about your symptoms?",
            inputOptions: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'symptoms',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          {
            type: 'button-option',
            inputKey: 'symptoms',
            message: "Which part of the body is affected?",
            inputOptions: [
              { value: 'head', label: 'Head or Brain' },
              { value: 'eye', label: 'Eye' },
              { value: 'ear', label: 'Ear' },
              { value: 'nose', label: 'Nose' },
              { value: 'mouth', label: 'Mouth or Teeth' },
              { value: 'neck', label: 'Neck or Back' },
              { value: 'chest', label: 'Chest' },
              { value: 'arm', label: 'Arm or Hand' },
              { value: 'abdomen', label: 'Abdomen' },
              { value: 'leg', label: 'Leg or Foot' },
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'speakToProvider',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          {
            type: 'button-option',
            inputKey: 'speakToProvider',
            message: "",
            inputOptions: [
              { value: true, label: 'Speak with a healthcare provider' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'modeOfPayment',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          {
            type: 'button-option',
            inputKey: 'modeOfPayment',
            message: "",
            inputOptions: [
              { value: 'insurance', label: 'Use my insurance' },
              { value: 'notInsurance', label: 'Continue without insurance' },
            ]
          }
        ]
      }
    ]
  },
]