export default [
  {
    code: 'signUpProceed',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Join Global Health Way Now!"}, 
          { type: 'message', text: "Would you like to proceed with signing up?"}, 
          {
            type: 'button-option',
            inputKey: 'signUpProceed',
            inputPrompt: true,
            inputOptions: [
              { value: 'yes', label: 'Yes', actionInSentence: '' },
              { value: 'no', label: 'No', actionInSentence: '' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'firstName',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Alright! Let's do this together."}, 
          { type: 'message', text: "Let's start with your first name"}, 
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'firstName',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'lastName',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Your last name?"}, 
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'lastName',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'nickNamePermission',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "That's a really nice name."}, 
          { type: 'message', text: "Now, may I know your nick name?"}, 
          {
            type: 'button-option',
            inputKey: 'nickNamePermission',
            inputPrompt: true,
            inputOptions: [
              { value: 'yes', label: 'Yes', actionInSentence: '' },
              { value: 'no', label: 'No', actionInSentence: '' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'nickName',
    skippable: true,
    skipValueKey: 'nickNamePermission',
    skippableValues: ['no'],
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Great! What is it?"}, 
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'nickName',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'dateOfBirth',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "When's your date of birth?"}, 
          {
            type: 'input-type-message',
            inputType: 'date',
            inputKey: 'dateOfBirth',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'mobileNumber',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "What's your mobile number?"}, 
          {
            type: 'input-type-message',
            inputType: 'mobileNumber',
            inputKey: 'mobileNumber',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'email',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "What's your email address?"}, 
          {
            type: 'input-type-message',
            inputType: 'email',
            inputKey: 'email',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'streetAddressLine1',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "What's your street address line 1?"}, 
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'streetAddressLine1',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'hasStreetLine2',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "Do you have a street address line 2?"}, 
          {
            type: 'button-option',
            inputKey: 'hasStreetLine2',
            inputPrompt: true,
            inputOptions: [
              { value: 'yes', label: 'Yes', actionInSentence: '' },
              { value: 'no', label: 'No', actionInSentence: '' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'streetAddressLine2',
    skippable: true,
    skipValueKey: 'hasStreetLine2',
    skippableValues: ['no'],
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "What's your street address line 2?"}, 
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'streetAddressLine2',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'city',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "What City is this located?"}, 
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'city',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'state',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "and what State?"}, 
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'state',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'zipCodeFirst5',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "What's the Zip Code (First 5)"}, 
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'zipCodeFirst5',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'zipCodeNext4',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "What's the Zip Code (Next 4)"}, 
          {
            type: 'input-type-message',
            inputType: 'text',
            inputKey: 'zipCodeNext4',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
  {
    code: 'password',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "We're almost done."}, 
          { type: 'message', text: "We just have to setup your password."}, 
          {
            type: 'input-type-password',
            inputType: 'password',
            inputKey: 'password',
            message: "",
            inputPrompt: true,
          }
        ]
      }
    ]
  },
]