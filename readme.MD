# AI Text Summarizer

A sophisticated, futuristic AI-powered text summarization tool built with Next.js, OpenAI, and Tailwind CSS. Features intelligent cost management, proportional summary lengths, and a beautiful glassmorphism design.

## ✨ Features

- **AI-Powered Summarization**: Uses OpenAI's GPT models for intelligent text summarization
- **Cost Protection**: Automatically capped at $0.05 per query with real-time cost estimation
- **Smart Summary Length**: Proportional summary length based on input text (max 400 words)
- **Futuristic Design**: Beautiful glassmorphism UI with steel blue, grey, sage, and blue color scheme
- **Temperature Control**: Adjustable AI creativity levels from factual to very creative
- **Real-time Cost Estimation**: Live token and cost calculations before processing
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Live Demo

Visit the live site: [AI Text Summarizer](https://yourusername.github.io/ai-summarize/)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **AI**: OpenAI GPT API integration
- **Deployment**: GitHub Pages with GitHub Actions
- **Build**: Static export for optimal performance

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-summarize.git
cd ai-summarize
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_MAX_COST=0.05
OPENAI_MODEL=gpt-3.5-turbo
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages. Here's how to set it up:

### 1. Repository Setup

1. Create a new repository on GitHub named `ai-summarize`
2. Push your code to the `main` branch
3. Go to repository Settings → Pages

### 2. Enable GitHub Pages

1. In the Pages settings, select "GitHub Actions" as the source
2. The workflow will automatically build and deploy your site

### 3. Automatic Deployment

- Every push to the `main` branch triggers automatic deployment
- The site will be available at: `https://yourusername.github.io/ai-summarize/`
- You can also manually trigger deployment from the Actions tab

### 4. Custom Domain (Optional)

To use a custom domain:
1. Add your domain to the Pages settings
2. Update the `basePath` in `next.config.js` if needed
3. Configure DNS records as instructed by GitHub

## 🔧 Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `NEXT_PUBLIC_MAX_COST`: Maximum cost per query (default: 0.05)
- `OPENAI_MODEL`: OpenAI model to use (default: gpt-3.5-turbo)

### Build Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 🎨 Customization

### Colors

The design uses a sophisticated color palette:
- **Steel Blue**: Primary accent color
- **Grey/Slate**: Secondary accents
- **Sage**: Tertiary accents
- **White**: High contrast elements

### Styling

- All styles are in `src/app/globals.css`
- Custom Tailwind colors in `tailwind.config.js`
- Component-specific styles in each component file

## 📱 Usage

1. **Enter Text**: Paste or type the text you want to summarize
2. **Adjust Creativity**: Use the temperature slider to control AI creativity
3. **Review Cost**: Check the real-time cost estimation
4. **Generate Summary**: Click "Summarize" to process your text
5. **Copy Result**: Use the copy button to save your summary

## 🔒 Security

- API keys are stored securely in environment variables
- Cost limits prevent unexpected charges
- No sensitive data is stored or transmitted unnecessarily

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [GitHub Pages](https://pages.github.com/)

---

**Note**: This application requires an OpenAI API key to function. Please ensure you have sufficient credits in your OpenAI account.

A sleek, modern web application that uses OpenAI's API to intelligently summarize text with customizable parameters and built-in cost protection.

## Features

- 🤖 **AI-Powered Summarization** - Leverages OpenAI's GPT models for intelligent text summarization
- 🎛️ **Temperature Control** - Adjust AI creativity from factual (0.0) to creative (1.0)
- 💰 **Cost Protection** - Hard cap at $0.10 per query with real-time cost estimation
- 🎨 **Premium Design** - Clean, modern interface with dark theme
- 📱 **Responsive** - Works seamlessly on mobile and desktop
- ⚡ **Fast & Reliable** - Built with Next.js for optimal performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **API**: OpenAI API Integration
- **Development**: Cursor IDE optimized

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-text-summarizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Input Text**: Paste or type the text you want to summarize
2. **Adjust Settings**: Use the temperature slider to control AI creativity
3. **Check Cost**: Review the estimated cost (capped at $0.10)
4. **Generate Summary**: Click the "Summarize" button
5. **Copy Result**: Use the copy button to save your summary

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── summarize/
│   │   │       └── route.ts          # API endpoint
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Main page
│   ├── components/
│   │   ├── CostEstimator.tsx        # Cost calculation component
│   │   ├── SummaryDisplay.tsx       # Summary result display
│   │   ├── TemperatureSlider.tsx    # Temperature control
│   │   └── TextInput.tsx            # Text input component
│   ├── lib/
│   │   ├── openai.ts               # OpenAI client setup
│   │   └── utils.ts                # Utility functions
│   └── types/
│       └── index.ts                # TypeScript definitions
├── public/
├── env.example                     # Environment variables template
├── next.config.js                  # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── package.json
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `NEXT_PUBLIC_MAX_COST` - Maximum cost per query (default: 0.10)
- `OPENAI_MODEL` - OpenAI model to use (default: gpt-3.5-turbo)

### Customization

- **Colors**: Edit `tailwind.config.js` to customize the color scheme
- **Cost Limits**: Adjust `NEXT_PUBLIC_MAX_COST` in environment variables
- **Models**: Modify the OpenAI model in `src/lib/openai.ts`

## Cost Management

The application includes several cost protection mechanisms:

- **Pre-flight Estimation**: Calculates cost before API calls
- **Hard Cap**: Rejects queries exceeding $0.10
- **Token Limits**: Enforces maximum token counts
- **Real-time Updates**: Shows cost estimates as user types

## Development with Cursor

This project is optimized for Cursor IDE:

1. **AI Assistance**: Use Cursor's AI features for code completion
2. **File Management**: Leverage Cursor's project navigation
3. **Debugging**: Use integrated debugging tools
4. **Git Integration**: Manage version control within Cursor

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform supporting Node.js:
- Netlify
- Railway  
- AWS Amplify
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email [your-email] or open an issue in the GitHub repository.