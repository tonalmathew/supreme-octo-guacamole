export function useFetch() {
  const makeRequest = async (url: string, method: string = 'GET', body?: any) => {
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Request failed");
      }
      
      const responseData = await response.json();
      return {
          status: true,
          message: 'Success',
          data: responseData
      }
    } catch (error: any) {
      return {
          status: false,
          message: error.message || 'Something went wrong!',
          data: null
        }
    }
  };

  return [ makeRequest ];
}
