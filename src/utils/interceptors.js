const responseInterceptors = [
  {
    name: 'formatResponse',
    success(response) {
      return response.data;
    }
  },
  {
    name: 'handleError',
    success(response) {
      if (response.code === 70006) {
        window.location.href = '/login';
      } else {
        return response;
      }
    }
  }
];

const requestInterceptors = [
  {
    name: 'addHttpRequestHeader',
    success(config) {
      config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('personal-app-token')}`;
      return config;
    },
    fail(err) {
      console.error('request error: ', err);
      return Promise.reject(err);
    }
  }
]

const interceptors = {
  response: responseInterceptors,
  request: requestInterceptors,
};

function doInstall(instance, options = {}) {
  const { type } = options;
  interceptors[type]
    .forEach((interceptor) => {
      const { success, fail } = interceptor;
      instance.interceptors[type].use(success, fail);
    })
}

export function install(instance, option = {}) {
  doInstall(instance, {
    type: 'request',
  });
  doInstall(instance, {
    type: 'response',
  })
}
