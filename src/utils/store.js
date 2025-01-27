import getConfig from "../config";

const readDefaultState = () => {
  try {
    return JSON.parse(window.localStorage.getItem('sputnik_v2_storage'))
  } catch (err) {
    return {}
  }
}

const defaultState = {
  loading: false,
  config: {
    factory: getConfig(process.env.NODE_ENV || 'development').contractName,
    contract: '',
    network: getConfig(process.env.NODE_ENV || 'development'),
    filter: {
      switchAll: true,
      switchInProgress: false,
      switchDone: false,
      switchNew: false,
      switchExpired: false,
    },
    gasOptions: {
      value: "300000000000000",
      editable: false,
      minValue: 30,
      maxValue: 300,
      step: 10,
    },
    lastShownProposal: 0,
    lastJsonData: 0,
    ...readDefaultState(),
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'config': {
      return {...state, config: action.payload}
    }
    case 'loading': {
      return {...state, loading: action.payload}
    }
    default:
      throw new Error('mutation type not defined')
  }
}

export {reducer, defaultState}
