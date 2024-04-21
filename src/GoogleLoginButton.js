import React, { useEffect } from 'react';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    const redirectUri = encodeURIComponent('http://localhost:3000/auth/google/callback');
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=154495330110-lfq5gilkoag7vv1a1rmcao5rtmuafi8n.apps.googleusercontent.com&redirect_uri=${redirectUri}&scope=profile email openid`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      // Gửi mã truy cập để lấy access token
      axios.post('YOUR_TOKEN_ENDPOINT', {
        code: code,
        redirect_uri: 'http://localhost:3000/auth/google/callback', // Điều hướng URI phải trùng với redirect URI đã đăng ký với Google
        client_id: '154495330110-lfq5gilkoag7vv1a1rmcao5rtmuafi8n.apps.googleusercontent.com',
        client_secret: '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',
        grant_type: 'authorization_code'
      }).then(response => {
        const accessToken = response.data.access_token;
        // Gọi API của Google để lấy thông tin người dùng
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`)
          .then(userInfoResponse => {
            const { email, picture } = userInfoResponse.data;
            console.log('Email:', email);
            console.log('Avatar:', picture);
            // Ở đây, bạn có thể thực hiện các hành động khác với thông tin người dùng như lưu vào cơ sở dữ liệu, hiển thị trên giao diện, vv.
          })
          .catch(error => {
            console.error('Error fetching user info:', error);
          });
      }).catch(error => {
        console.error('Error exchanging code for token:', error);
      });
    }
  }, []);

  return (
    <div>
      <button onClick={handleGoogleLogin}>Đăng nhập bằng Google</button>
    </div>
  );
};

export default GoogleLoginButton;
