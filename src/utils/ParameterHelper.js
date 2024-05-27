const ParameterHelper = {
  setParam(paramObj) {
    let query = '';
    for (const key in paramObj) {
      if (paramObj[key]) {
        if (query) {
          query += '&' + key + '=' + paramObj[key];
        } else {
          query += key + '=' + paramObj[key];
        }
      }
    }
    window.location.search = query;
  },
  getParams() {
    const queryString = window.location.search.replace('?','');
    const params = queryString.split('&');
    const searchParams = {};
    for (let i = 0; i < params.length; i++) {
      const pair = params[i].split('=');
      searchParams[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return searchParams;
  }
}

export default ParameterHelper
