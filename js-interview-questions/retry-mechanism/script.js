function letsRetry(call, retries = 3, delay) {
    let attempt = 0;

    function retry() {
        attempt++;

        return call()
        .then(res => res)
        .catch(err => {
            if (attempt >= retries) {
                return Promise.reject(`Max retries reached. Last error: ${err}`);
            }
            console.log(`Retry attempt #${attempt} failed, retrying after ${delay}ms...`);
            return new Promise(resolve => setTimeout(resolve, delay)).then(retry);
        });
    }

    return retry();
}

function mockApiCall() {
  return new Promise((resolve, reject) => {
    const apiStatus = Math.random() < 0.5 ? 200 : 500; // randomly succeed/fail
    if (apiStatus >= 200 && apiStatus < 400) {
      resolve('Success');
    } else {
      reject('API call failed');
    }
  });
}

letsRetry(mockApiCall, 5, 1000)
  .then(console.log)
  .catch(console.error);
