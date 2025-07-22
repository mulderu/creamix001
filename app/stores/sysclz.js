export class User {
  constructor(apiServer, $fetch) {
    this.apiServer = apiServer;
    this.$fetch = $fetch;
    this.user = null;
    this.token = localStorage.getItem("token") || null;
    this.loading = false;
    this.error = null;
  }

  async login(email, password) {
    this.loading = true;
    this.error = null;
    try {
      const data = await this.$fetch(`${this.apiServer}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { identifier: email, password },
      });
      this.user = data.user;
      this.token = data.jwt;
      localStorage.setItem("token", data.jwt);
    } catch (err) {
      console.log(err);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
    console.log("logout - done!");
  }

  async getProfile() {
    this.loading = true;
    this.error = null;
    try {
      this.user = await this.$fetch(`${this.apiServer}/api/users/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${this.token}` },
      });
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async updatePassword(currentPassword, newPassword, confirmPassword = null) {
    this.loading = true;
    this.error = null;
    try {
      const data = await this.$fetch(
        `${this.apiServer}/api/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: {
            currentPassword,
            password: newPassword,
            passwordConfirmation: confirmPassword || newPassword,
          },
        }
      );
      this.user = data.user;
      this.token = data.jwt;
      localStorage.setItem("token", data.jwt);
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async registerUser(username, email, password) {
    this.loading = true;
    this.error = null;
    try {
      const data = await this.$fetch(
        `${this.apiServer}/api/auth/local/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { username, email, password },
        }
      );
      this.user = data.user;
      this.token = data.jwt;
      localStorage.setItem("token", data.jwt);
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async forgotPassword(email) {
    this.loading = true;
    this.error = null;
    try {
      await this.$fetch(`${this.apiServer}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { email },
      });
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  isAuthenticated() {
    return !!this.token && !!this.user?.email;
  }
}

export class Strapi {
  constructor(apiServer, $fetch, $token = null) {
    this.apiServer = apiServer;
    this.$fetch = $fetch;
    this.token = $token || localStorage.getItem("token") || null;
    this.loading = false;
    this.error = null;
  }

  async getItems(pluralApiId, documentId = null) {
    this.loading = true;
    this.error = null;
    try {
      const items = await this.$fetch(documentId ?
         `${this.apiServer}/api/${pluralApiId}/${documentId}`:
         `${this.apiServer}/api/${pluralApiId}`,{
          method: "GET",
          headers: { Authorization: `Bearer ${this.token}` },
        });
      return items
    } catch (err) {
      console.error(err);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async postItems(pluralApiId, payLoad) {
    this.loading = true;
    this.error = null;
    try {
      const items = await this.$fetch(`${this.apiServer}/api/${pluralApiId}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` },
        body: typeof(payLoad) === 'object' ? JSON.stringify(payLoad) : payLoad
      });
      return items
    } catch (err) {
      console.error(err);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async ajax(httpMethod, pluralApiId, documentId = null, payLoad = null) {
    this.loading = true;
    this.error = null;
    try {
      const url = documentId ?
         `${this.apiServer}/api/${pluralApiId}/${documentId}`:
         `${this.apiServer}/api/${pluralApiId}`;
      const reqOptions = {
          method: httpMethod,
          headers: { Authorization: `Bearer ${this.token}` },
        }
      if (payLoad) {
        reqOptions['body'] = typeof(payLoad) === 'object' ? JSON.stringify(payLoad) : payLoad
      }

      return await this.$fetch(url, reqOptions);
    } catch (err) {
      console.error(err);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

}
