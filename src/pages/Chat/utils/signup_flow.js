export default [
  {
    code: 'signUpProceed',
    messages: [
      { type: 'message', text: "Join Global Health Way Now!"}, 
      { type: 'message', text: "Would you like to proceed with signing up?"}, 
      {
        type: 'button-option',
        inputKey: 'signUpProceed',
        inputPrompt: true,
        inputOptions: [
          { value: 'yes', label: 'Yes', actionInSentence: '' },
          { value: 'no', label: 'No', actionInSentence: '' },
          { value: 'member', label: 'I already have an account', actionInSentence: '' }
        ]
      }
    ],
    stoppingConditions: {
      responseKey: 'signUpProceed', 
      responseValues: ['no', 'member'],
      exitMessages: {
        no: {
          type: 'button-option',
          inputKey: 'signUpProceed',
          inputPrompt: true,
          inputOptions: [
            { value: 'yes', label: 'Go back to Home Page.', action: { route: '/', actionType: 'redirect' } },
          ]
        },
        member: { 
          type: 'button-option',
          inputKey: 'signUpProceed',
          inputPrompt: true,
          inputOptions: [
            { value: 'yes', label: 'Click here to sign in.', action: { route: '/login', actionType: 'redirect' } },
          ]
        }
      }
    }
  },
  {
    code: 'firstName',
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
  },
  {
    code: 'lastName',
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
  },
  {
    code: 'nickNamePermission',
    messages: [
      { type: 'message', text: "That's a really nice name."}, 
      { type: 'message', text: "Now, may I know your nick name?"}, 
      {
        type: 'button-option',
        inputKey: 'nickNamePermission',
        inputPrompt: true,
        inputOptions: [
          { value: 'yes', label: 'Yes', actionInSentence: '' },
          { value: 'no', label: 'Skip', actionInSentence: '' }
        ]
      }
    ]
  },
  {
    code: 'nickName',
    skippable: true,
    skipValueKey: 'nickNamePermission',
    skippableValues: ['no'],
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
  },
  {
    code: 'dateOfBirth',
    messages: [
      { type: 'message', text: "What is your date of birth?"}, 
      {
        type: 'input-type-message',
        inputType: 'datePicker',
        inputKey: 'dateOfBirth',
        message: "",
        inputPrompt: true,
        optionType: 'range',
        rangeStart: 1890,
        rangeEnd: 'currentYear',
      }
    ]
  },
  {
    code: 'mobileNumber',
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
  },
  {
    code: 'email',
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
  },
  {
    code: 'streetAddressLine1',
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
  },
  {
    code: 'hasStreetLine2',
    messages: [
      { type: 'message', text: "Do you have a street address line 2?"}, 
      {
        type: 'button-option',
        inputKey: 'hasStreetLine2',
        inputPrompt: true,
        inputOptions: [
          { value: 'yes', label: 'Yes', actionInSentence: '' },
          { value: 'no', label: 'Skip', actionInSentence: '' }
        ]
      }
    ]
  },
  {
    code: 'streetAddressLine2',
    skippable: true,
    skipValueKey: 'hasStreetLine2',
    skippableValues: ['no'],
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
  },
  {
    code: 'city',
    messages: [
      { type: 'message', text: "What City is this located?"}, 
      {
        type: 'input-type-message',
        inputType: 'select',
        inputKey: 'city',
        message: "",
        inputPrompt: true,
      }
    ]
  },
  {
    code: 'state',
    messages: [
      { type: 'message', text: "and what State?"}, 
      {
        type: 'input-type-message',
        inputType: 'select',
        inputKey: 'state',
        message: "",
        inputPrompt: true,
      }
    ]
  },
  {
    code: 'zipCodeFirst5',
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
  },
  {
    code: 'zipCodeNext4',
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
  },
  {
    code: 'password',
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