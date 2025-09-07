# Jinx Bot
A Spotify Chatbot for adding songs without searching
# 🎵 YouTube to Spotify Playlist Converter

Transform your YouTube playlists into Spotify playlists with just one click! No more manual searching and adding songs one by one.

## 🚀 Features

- **One-Click Conversion**: Simply paste your YouTube playlist URL and watch the magic happen
- **Automatic Song Matching**: Intelligently matches YouTube songs with their Spotify equivalents
- **Seamless Integration**: Direct connection to your Spotify account
- **Cross-Platform**: Built with React Native for iOS and Android
- **Fast & Reliable**: Powered by Node.js backend deployed on Render

## 🎯 Problem Statement

Music lovers often face the frustrating experience of:
- Finding amazing playlists on YouTube that aren't available on Spotify
- Having to manually search and add each song individually to Spotify
- Losing motivation halfway through the tedious process of recreating playlists
- Missing out on great music because of platform limitations

**Our solution**: Paste a YouTube playlist URL, and instantly get the same playlist in your Spotify account!

## 🛠️ Tech Stack

### Frontend (Mobile App)
- **React Native** - Cross-platform mobile development
- **Expo Router** - File-based routing for navigation
- **Expo** - Development platform and toolchain

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **Render** - Cloud deployment platform

### APIs & Services
- **YouTube Data API v3** - Fetching playlist and video information
- **Spotify Web API** - Creating playlists and adding tracks
- **OAuth 2.0** - Secure authentication for both platforms

## 📱 How It Works

1. **Connect Your Spotify**: Authenticate with your Spotify account
2. **Paste YouTube URL**: Copy any YouTube playlist URL into the app
3. **Magic Happens**: Our algorithm extracts songs and finds Spotify matches
4. **Enjoy Your Playlist**: The converted playlist appears in your Spotify account

## 🏗️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Spotify Developer Account
- YouTube Data API key

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/youtube-to-spotify-converter.git
cd youtube-to-spotify-converter/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
REDIRECT_URI=your_redirect_uri
PORT=3000
```

4. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the mobile app directory:
```bash
cd ../mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
API_BASE_URL=https://your-render-deployment-url.com
```

4. Start the development server:
```bash
npx expo start
```

## 🚀 Deployment

### Backend (Render)

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on every push to main branch

### Mobile App

1. **iOS**: Build and submit to App Store using Expo Application Services (EAS)
2. **Android**: Build and publish to Google Play Store using EAS

## 📊 API Endpoints

### Authentication
- `GET /auth/spotify` - Initiate Spotify OAuth flow
- `POST /auth/callback` - Handle OAuth callback

### Playlist Operations
- `POST /convert` - Convert YouTube playlist to Spotify
- `GET /status/:conversionId` - Check conversion status

## 🔧 Configuration

### Environment Variables

#### Backend
| Variable | Description |
|----------|-------------|
| `SPOTIFY_CLIENT_ID` | Your Spotify app client ID |
| `SPOTIFY_CLIENT_SECRET` | Your Spotify app client secret |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key |
| `REDIRECT_URI` | OAuth redirect URI |
| `PORT` | Server port (default: 3000) |

#### Mobile App
| Variable | Description |
|----------|-------------|
| `API_BASE_URL` | Backend server URL |

## 🎨 Screenshots

[Add screenshots of your app here]

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Support for Apple Music conversion
- [ ] Batch playlist conversion
- [ ] Playlist collaboration features
- [ ] Advanced matching algorithms
- [ ] Offline conversion queue
- [ ] Custom playlist artwork

## ⚠️ Limitations

- Requires active internet connection
- Some songs might not be available on Spotify
- Rate limited by YouTube and Spotify APIs
- Requires valid accounts on both platforms

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- YouTube Data API for playlist access
- Spotify Web API for playlist creation
- React Native and Expo communities
- All the music lovers who inspired this project

## 📞 Support

- **Email**: support@yourapp.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/youtube-to-spotify-converter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/youtube-to-spotify-converter/discussions)

## 🎵 Made with ❤️ for Music Lovers

Transform your music experience - never lose a great playlist again!

---

**Note**: This app is not affiliated with YouTube or Spotify. All trademarks belong to their respective owners.
