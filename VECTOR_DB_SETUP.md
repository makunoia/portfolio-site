# Vector Database Setup for Personal Information

This guide will help you set up the vector database integration for your portfolio site's AI assistant.

## Overview

The AI assistant now uses a vector database to store and retrieve your personal information, allowing it to provide accurate, personalized responses about your background, experience, skills, and projects.

## Setup Instructions

### 1. Environment Variables

Create `.env.local` in the project root and add:

```env
OPENAI_API_KEY=your_openai_api_key_here

# Pinecone (get these from Pinecone Console)
PINECONE_API_KEY=your_pinecone_api_key
# Full index host URL, e.g. https://personal-info-xxxx-xxxx.svc.us-east-1-aws.pinecone.io
PINECONE_INDEX_HOST=https://<your-index-host>
# Optional namespace to isolate data
PINECONE_NAMESPACE=portfolio
```

### 2. Personal Information

Edit the `personal-info.json` file with your actual information. The file contains a comprehensive template with sections for:

- Basic information (name, bio, contact details)
- Work experience
- Education
- Skills (programming languages, frameworks, tools)
- Projects
- Certifications
- Languages
- Interests
- Achievements
- Availability

### 3. Embed Your Information

After updating your personal information, run the embedding script:

```bash
node scripts/embed-personal-info.js
```

This script will:

- Read your personal information from `personal-info.json`
- Generate embeddings using OpenAI's text-embedding-3-small model
- Store the embeddings in the vector database
- Confirm successful completion

### 4. Test the Assistant

Start your development server:

```bash
npm run dev
```

Navigate to your portfolio site and test the AI assistant with questions like:

- "Tell me about your experience"
- "What projects have you worked on?"
- "What are your skills?"
- "How can I contact you?"

## How It Works

### Vector Database

- Uses Pinecone as the vector store
- Stores embeddings of your personal information chunks
- Performs similarity search to find relevant information for user queries

### Embedding Process

- Personal information is broken down into logical chunks
- Each chunk is embedded using OpenAI's text-embedding-3-small model
- Chunks are categorized by type (experience, skills, projects, etc.)

### Query Processing

- User queries are embedded using the same model
- Similarity search finds the most relevant personal information chunks
- Context is provided to the AI assistant for accurate responses

## Production Considerations

Pinecone is already production-ready. Ensure you:

- Keep `.env.local` secrets out of version control
- Set appropriate namespaces per environment (dev/staging/prod)
- Monitor usage and limits in Pinecone Console

## File Structure

```
├── personal-info.json              # Your personal information
├── scripts/
│   └── embed-personal-info.js     # Script to embed your information
├── src/app/(app)/lib/
│   └── vector-db.ts               # Vector database utilities
├── src/app/(payload)/api/chat/
│   └── route.ts                   # Updated chat API with vector search
└── .env.local                     # Local environment variables
```

## Troubleshooting

### Common Issues

1. **"personal-info.json file not found"**
   - Make sure the file exists in the project root
   - Check the file name spelling

2. **"OPENAI_API_KEY environment variable is not set"**
   - Add your OpenAI API key to `.env.local`
   - Restart your development server

3. **"Error generating embeddings"**
   - Check your OpenAI API key is valid
   - Ensure you have sufficient API credits
   - Check your internet connection

4. **Assistant not responding with personal information**
   - Run the embedding script again
   - Check the console for errors
   - Verify your personal information is properly formatted JSON

### Updating Information

To update your personal information:

1. Edit `personal-info.json`
2. Run `node scripts/embed-personal-info.js`
3. Test the assistant with new questions

## Security Notes

- Keep your `.env.local` file secure and never commit it to version control
- The in-memory vector database is reset when the server restarts
- For production, use a persistent vector database service
- Consider rate limiting for the chat API endpoint

## Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure your personal information JSON is valid
4. Test with simple queries first
