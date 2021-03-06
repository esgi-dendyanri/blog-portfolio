export default {
  isContainUrl: (str: string) : boolean => {
    const regex: string = "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    return !!(new RegExp(regex).test(str))
  }
} 