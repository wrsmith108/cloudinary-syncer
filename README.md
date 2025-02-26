
# Cloudinary Sync for Shopify

A Shopify admin application that synchronizes Cloudinary media assets across multiple Shopify stores.

## Project Overview

This application provides a centralized interface for managing and synchronizing Cloudinary assets with Shopify stores. It follows Shopify's admin design patterns and provides robust functionality for asset management.

### Key Features

- **Folder Management**: Browse and manage Cloudinary folders with detailed sync status
- **Sync Logs**: Track synchronization history and status
- **Scheduled Syncs**: Schedule and manage automated synchronization tasks
- **Configuration Settings**: Manage Cloudinary credentials and sync preferences

### Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM

## Development Setup

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- A Shopify Partner account
- Cloudinary account with API credentials

### Local Development

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
```

2. Navigate to the project directory:
```sh
cd <YOUR_PROJECT_NAME>
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

### Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── layout/    # Layout components (Header, etc.)
│   └── ui/        # shadcn/ui components
├── pages/         # Route components
├── types/         # TypeScript type definitions
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── data/          # Mock data and constants
```

## Configuration

### Cloudinary Settings

The application requires the following Cloudinary credentials:
- Cloud Name
- API Key
- API Secret

These can be configured in the Settings page of the application.

### Sync Preferences

Users can configure:
- Auto Sync (Enable/Disable)
- Sync Interval (Hourly/Daily/Weekly/Monthly)
- Notification Preferences
- Retry Attempts

## Deployment

### Production Deploy

1. Visit [Lovable](https://lovable.dev/projects/1f81b937-8c59-463c-84a3-6dda779282ea)
2. Click on Share -> Publish

### Custom Domain Setup

While custom domains aren't directly supported through Lovable, you can deploy to your own domain using Netlify. See our [Custom domains documentation](https://docs.lovable.dev/tips-tricks/custom-domain/) for detailed instructions.

## Development Resources

- [Cloudinary API Documentation](https://cloudinary.com/documentation/shopify_user_guide)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)

## Project Customization

### Using Lovable

Visit the [Lovable Project](https://lovable.dev/projects/1f81b937-8c59-463c-84a3-6dda779282ea) to make changes through the AI interface.

### Using GitHub

1. Navigate to the file you want to modify
2. Click the "Edit" button (pencil icon)
3. Make your changes and commit

### Using GitHub Codespaces

1. Navigate to the repository's main page
2. Click "Code" -> "Codespaces"
3. Click "New codespace"

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request with a clear description of the changes

## Support

For technical support or questions about the application, refer to the [Cloudinary Documentation](https://cloudinary.com/documentation/shopify_user_guide) or contact the development team.
