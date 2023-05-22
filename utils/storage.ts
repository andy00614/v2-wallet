export class TokenManager {
  private static instance: TokenManager;
  private tokenKey: string;

  private constructor() {
    this.tokenKey = 'token';
  }

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  removePublicKey(): void {
    localStorage.removeItem('publicKey');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setPublickKey(publicKey: string): void {
    localStorage.setItem('publicKey', publicKey);
  }

  getPublicKey(): string | null {
    return localStorage.getItem('publicKey');
  }

}

// // 使用示例
// const tokenManager = TokenManager.getInstance();

// // 添加或更新 token
// tokenManager.setToken('your_token_here');

// // 删除 token
// tokenManager.removeToken();
