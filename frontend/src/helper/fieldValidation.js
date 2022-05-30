export const required = val => (!val || ( typeof val === 'string' && !val.trim() ) ? 'Field is required' : undefined )
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined