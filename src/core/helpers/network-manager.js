class NetworkManager {
  static async request(url, method) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async requestWithBody(url, method, body) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async decode(data, ModelClass) {
    try {
      return new ModelClass(data);
    } catch (error) {
      throw error;
    }
  }
}

export default NetworkManager;
