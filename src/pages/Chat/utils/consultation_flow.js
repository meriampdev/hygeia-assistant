import us_states from './us_states'

export default [
  {
    code: 'userRole',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Are you a Client or a Provider?" },
          {
            type: 'button-option',
            inputKey: 'userRole',
            inputPrompt: true,
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
          {
            type: 'message',
            messageIsActionDependent: true,
            actionKey: 'userRole',
            messageValues: { client: 'If this is a medical emergency, please call 911.\nWho is this visit for?', provider: '' },
          },
          {
            type: 'button-option',
            inputKey: 'visitFor',
            inputPrompt: true,
            inputOptions: [
              { value: 'me', label: 'Me', actionInSentence: 'For me.' },
              { value: 'child', label: 'My Child (Under 18)', actionInSentence: 'For my child.' },
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
          { type: 'message', text: "Let's Get Started\nI'm Hygeia, your healthcare assistant.\nHow can I help you?" },
          {
            type: 'message',
            messageIsActionDependent: true,
            actionKey: 'visitFor',
            messageValues: { 
              child: "Let me help you understand your child's symptoms.\nNow I'd like to know a little bit more about your child.", 
              me: "Let me help you understand your symptoms.\nNow I'd like to know a little bit more about you.",
              someoneElse: "If you are reporting for another person, please have that person create his/her own profile."
            }
          },
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'patientName',
            messageIsActionDependent: true,
            actionKey: 'visitFor',
            messageValues: { child: "What is your Child's name?", me: "What's your name?" },
            message: "What's your name?",
            inputPrompt: true,
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
            type: 'input-dependent', 
            inputKey: 'patientName' , 
            text: "Hi {patientName}! Are you a male or female?",
            messageIsActionDependent: true,
            actionKey: 'visitFor',
            messageValues: { 
              child: "Is {patientName} a male or female?", 
              me: "Hi {patientName}! Are you a male or female?" 
            },
            skippable: true,
            skipValueKey: 'gender',
            skippableValues: ['male', 'female', 'question', 'redo']
          }, 
          {
            type: 'button-option',
            inputKey: 'gender',
            skipValueKey: 'gender',
            message: "",
            inputOptions: [
              { value: 'male', label: 'Male', actionInSentence: 'Male' },
              { value: 'female', label: 'Female', actionInSentence: 'Female' },
              { value: 'question', label: 'Why only these options?', actionInSentence: 'Why only these options?' }
            ],
            skippable: true,
            skippableValues: ['male', 'female', 'question'],
            inputPrompt: true,
          },
          { 
            type: 'input-dependent', 
            inputKey: 'gender' , 
            skipValueKey: 'gender',
            text: "This question is about biological sex rather than gender identity, and for medical purposes only. Please select the medically relevant option.",
            skippable: true,
            skippableValues: ['redo','male', 'female', "", null, undefined],
            redoStepAfterMessage: true,
            stepCode: 'gender',
            redoPoint: true
          },
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
            inputType: 'select',
            inputKey: 'birthYear',
            optionType: 'range',
            rangeStart: 1890,
            rangeEnd: 'currentYear',
            messageIsActionDependent: true,
            actionKey: 'visitFor',
            messageValues: { 
              child: "What year was your child born?", 
              me: "What year were you born",
              someoneElse: ""
            },
            message: "What year were you born?",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'stateOfResidence',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          {
            type: 'input-type-message',
            inputType: 'select',
            optionType: 'given',
            options: us_states,
            inputKey: 'stateOfResidence',
            messageIsActionDependent: true,
            actionKey: 'visitFor',
            messageValues: { 
              child: 'In what State is your child physically located right now?', 
              me: 'In what State are you physically located right now?', 
              someoneElse: 'If you are reporting for another person, please have that person create his/her own profile' 
            },
            message: "What State are you located now?",
            inputPrompt: true,
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
          { 
            messageIsActionDependent: true,
            actionKey: 'visitFor',
            messageValues: { 
              child: "Please provide more information about your child's symptoms.", 
              me: "Please provide more information about your symptoms.",
              someoneElse: ""
            }
          }, 
          {
            type: 'button-option',
            inputKey: 'didProvideSymptoms',
            inputPrompt: true,
            inputOptions: [
              { value: 'continue', label: 'Continue' },
              { value: 'back', label: 'Back' }
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
          { type: 'message', text: "What is your main concern?"}, 
          {
            type: 'selection',
            apiEndpoint: '',
            apiDataKey: null,
            inputKey: 'symptoms',
            resultKey: 'symptoms',
            message: "Which part of the body is affected?",
            inputPrompt: true,
            inputOptions: [
              { value: 'covid-19', label: 'Covid-19/Coronavirus' },
              { value: 'Constitutional', label: 'Constitutional' },
              { value: 'Respiratory', label: 'Respiratory' },
              { value: 'Neurological', label: 'Neurological' },
              { value: 'Eyes', label: 'Eyes' },
              { value: 'Mouth-Throat', label: 'Mouth or Throat' },
              { value: 'Ears', label: 'Ears' },
              { value: 'Nose', label: 'Nose' },
              { value: 'Gastrointestinal', label: 'Gastrointestinal' },
              { value: 'Musculoskeletal', label: 'Musculoskeletal' },
              { value: 'Endocrine', label: 'Endocrine' },
              { value: 'Physchiatric', label: 'Physchiatric' },
              { value: 'Cardiovascular', label: 'Cardiovascular' },
              { value: 'Genitourinary', label: 'Genitourinary' },
              { value: 'Integumentary', label: 'Integumentary (Skin)' },
              { value: 'Heme/Lymphatic/Immune', label: 'Heme/Lymphatic/Immune' }
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
            type: 'request-trigger-buttons',
            inputKey: 'speakToProvider',
            inputPrompt: true,
            message: "",
            inputOptions: [
              { value: true, label: 'Connect with a healthcare provider' }
            ]
          }
        ]
      }
    ]
  },
  // {
  //   code: 'modeOfPayment',
  //   conversation: [
  //     {
  //       from: 'hygeia',
  //       messages: [
  //         { type: 'message', text: "How would you like to pay?"}, 
  //         {
  //           type: 'button-option',
  //           inputKey: 'modeOfPayment',
  //           message: "",
  //           inputPrompt: true,
  //           inputOptions: [
  //             { value: 'insurance', label: 'Use my insurance' },
  //             { value: 'notInsurance', label: 'Continue without insurance' },
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
]