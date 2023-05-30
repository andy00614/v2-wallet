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
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
  }

  removePublicKey(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('publicKey');
    }
  }

  getToken(): string | null | undefined {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
  }

  setPublickKey(publicKey: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('publicKey', publicKey);
    }
  }

  getPublicKey(): string | null | undefined {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('publicKey');
    }
  }

}

// // 使用示例
// const tokenManager = TokenManager.getInstance();

// // 添加或更新 token
// tokenManager.setToken('your_token_here');

// // 删除 token
// tokenManager.removeToken();
