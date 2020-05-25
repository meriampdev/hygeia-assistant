import us_states from './us_states'

export default [
  {
    code: 'userRole',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Hi! I'm Hygeia, your healthcare assistant."}, 
          { type: 'message', text: "Let's Get Started." },
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
            messageValues: { client: 'If this is a medical emergency, please contact your local emergency services.', provider: '' },
            message: "If this is a medical emergency, please contact your local emergency services."
          },
          { type: 'message', text: 'Who is this visit for?' },
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
    code: 'patientName',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          {
            type: 'message',
            messageIsActionDependent: true,
            actionKey: 'visitFor',
            messageValues: { 
              child: "Please provide more information about your child's symptoms.", 
              me: "Please provide more information about your symptoms." 
            },
            message: "Now, I'd like to know a bit more of you."
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
              child: "Is your child a male or female?", 
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
    code: 'didProvideSymptoms',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Great, I have identified medical information for 625,123 people of that age and sex. "}, 
          { 
            type: 'message', text: "I'll be able to compare your symptoms to theirs.",
            messageIsActionDependent: true,
            actionKey: 'visitFor',
            messageValues: { 
              child: "I'll be able to compare your child's symptoms to theirs.", 
              me: "I'll be able to compare your symptoms to theirs.",
              someoneElse: ""
            }
          }, 
          { 
            type: 'message', text: "Would like to provide more information about your symptoms?",
            messageIsActionDependent: true,
            actionKey: 'visitFor',
            messageValues: { 
              child: "Would like to provide more information about your child's symptoms?", 
              me: "Would like to provide more information about your symptoms?",
              someoneElse: ""
            }
          }, 
          {
            type: 'button-option',
            inputKey: 'didProvideSymptoms',
            message: "Would you like to provide more information about your symptoms?",
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
    code: 'bodyAreaSelection',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Which part of the body is affected?"}, 
          {
            type: 'request-trigger-buttons',
            apiEndpoint: '',
            apiDataKey: null,
            inputKey: 'bodyAreaSelection',
            resultKey: 'bodyAreaSymptoms',
            message: "Which part of the body is affected?",
            inputPrompt: true,
            inputOptions: [
              { 
                value: [
                  'head', 'fever', 'conscious', 'memory', 'dizzy'
                ], 
                label: 'Head'
              },
              { 
                value: [
                  'hair'
                ], 
                label: 'Hair'
              },
              { 
                value: [
                  'face', 'skin', 'blackheads'
                ], 
                label: 'Face'
              },
              { 
                value: [
                  'eye', 'vision', 'pupils', 'nystagmus', 'eyelid', ''
                ], 
                label: 'Eye' 
              },
              { 
                value: [ 'ear', 'hear', 'clogged'], 
                label: 'Ear' 
              },
              { 
                value: [
                  'nose', 'throat', 'nasal', 'snoring', 'snore', 'sneeze', 'smell', 'mucus'
                ], 
                label: 'Nose' 
              },
              { 
                value: [
                  'mouth', 'breath', 'tooth', 'bite', 'biting', 'chew', 'chewing', 'gum', 'teeth', 'toungue',
                  'cough', 'snoring', 'vomiting', 'appetite', 'thirst', 'tonsils'
                ], 
                label: 'Mouth or Teeth' 
              },
              { 
                value: [
                  'throat', 'swallow', 'swallowing', 'cough', 'neck', 'hawking', 'hoarse', 'whistling', 'breathing',
                  'mucus', 'voice', 'itchy throat', 'lymph node'
                ], 
                label: 'Neck or Back' 
              },
              { 
                value: [
                  'chest', 'upper limb', 'heart', 'heartburn', 'palpitations', 'cough', 'breath', 'gynecomastia'
                ], 
                label: 'Chest' 
              },
              { 
                value: [
                  'arm', 'hand', 'limb', 'shoulder', 'joint', 'extremities', 'spasms', 'forearm', 'elbow', 'wrist',
                  'finger', 'nail', 'skin', 'muscles'
                ], 
                label: 'Arm or Hand' 
              },
              { 
                value: [
                  'abdomen', 'stomach', 'heartburn', 'bloat', 'bloating', 'vomit', 'digest', 'indigestion', 'weight',
                  'cramps', 'period', 'constipation', 'diarrhea', 'sick', 'bowel', 'black stool', 'stool'
                ], 
                label: 'Abdomen' 
              },
              { 
                value: [
                  'limb', 'thigh', 'joint', 'hip', 'lower back', 'buttock', 'leg'
                ], 
                label: 'Thigh' 
              },
              {
                value: [
                  'knee', 'creak', 'walk', 'limp', ''
                ],
                label: 'Knee'
              },
              {
                value: [
                  'lower limb', 'calf', 'lower leg', 'leg', 'calve'
                ],
                label: 'Lower Leg'
              },
              {
                value: [
                  'foot', 'toe', 'ankle', 'feet', 'nail'
                ],
                label: 'Foot'
              },
              {
                value: [
                  'vaginal', 'intercourse', 'sex', 'menstrual', 'period', 'frequent urination', 'urinating', 'urine',
                  'urinary', 'crotch', 'genital', 'penis'
                ],
                label: 'Sexual Organs'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'selectedFromSuggestion',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Please select anything that closely describes your condition."}, 
          { type: 'message', text: "I will have follow up questions based on what you will select."}, 
          {
            type: 'swipeable-list',
            dataKey: 'bodyAreaSymptoms',
            valueKey: 'id',
            labelKey: 'common_name',
            inputType: 'text',
            inputKey: 'selectedFromSuggestion',
            message: "Describe your symptom",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'diagnosis',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Starting diagnosis..."}, 
        ]
      }
    ]
  },
  // {
  //   code: 'speakToProvider',
  //   conversation: [
  //     {
  //       from: 'hygeia',
  //       messages: [
  //         {
  //           type: 'request-trigger-buttons',
  //           inputKey: 'speakToProvider',
  //           inputPrompt: true,
  //           message: "",
  //           inputOptions: [
  //             { value: true, label: 'Connect with a healthcare provider' }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
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